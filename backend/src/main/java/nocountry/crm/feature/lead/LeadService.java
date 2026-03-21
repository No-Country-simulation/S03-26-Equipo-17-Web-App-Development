package nocountry.crm.feature.lead;

import lombok.RequiredArgsConstructor;
import nocountry.crm.shared.exception.BusinessRuleException;
import nocountry.crm.shared.exception.ResourceNotFoundException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final LeadMapper leadMapper;

    public LeadResponse crearLead(LeadRequest request) {
        if (request.telefono() != null && leadRepository.findByTelefono(request.telefono()).isPresent()) {
            throw new BusinessRuleException("Ya existe un Lead con el telefono: " + request.telefono());
        }
        Lead lead = leadMapper.toEntity(request);
        Lead guardado = leadRepository.save(lead);
        return leadMapper.toResponse(guardado);
    }

    public List<LeadResponse> listarLeads() {
        return leadMapper.toResponseList(leadRepository.findByDeletedAtIsNull());
    }

    public LeadResponse obtenerPorId(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));
        return leadMapper.toResponse(lead);
    }

    public LeadResponse cambiarEstado(Long id, EstadoLead nuevoEstado) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        if (nuevoEstado == EstadoLead.CLIENTE && (lead.getEmail() == null || lead.getEmail().isBlank())) {
            throw new BusinessRuleException("No se puede pasar a CLIENTE sin un email registrado");
        }

        lead.setEstado(nuevoEstado);
        lead.setLastActivity(LocalDateTime.now());
        Lead actualizado = leadRepository.save(lead);
        return leadMapper.toResponse(actualizado);
    }

    //Conectar con R2
    public void eliminarLead(Long id, Long userId) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        lead.setDeletedAt(LocalDateTime.now());
        lead.setDeletedBy(userId);
        leadRepository.save(lead);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void checkStaleLeads() {
        LocalDateTime limite = LocalDateTime.now().minusHours(48);

        List<Lead> leadsInactivos = leadRepository.buscarCandidatosAStale(
                EstadoLead.NUEVO, limite
        );

        leadsInactivos.forEach(lead -> lead.setStale(true));
        leadRepository.saveAll(leadsInactivos);
    }

    public LeadResponse marcarAtendido(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        lead.setStale(false);
        lead.setLastActivity(LocalDateTime.now());
        return leadMapper.toResponse(leadRepository.save(lead));
    }
}
