package nocountry.crm.feature.lead;

import lombok.RequiredArgsConstructor;
import nocountry.crm.feature.auth.entity.User;
import nocountry.crm.feature.email.EmailService;
import nocountry.crm.feature.interaction.InteractionService;
import nocountry.crm.feature.interaction.InteractionType;
import nocountry.crm.feature.whatsapp.TwilioWhatsAppService;
import nocountry.crm.shared.exception.BusinessRuleException;
import nocountry.crm.shared.exception.ResourceNotFoundException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final LeadMapper leadMapper;
    private final InteractionService interactionService;
    private final EmailService emailService;
    private final TwilioWhatsAppService twilioWhatsAppService;

    // Inyectamos el template de WebSockets
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public LeadResponse crearLead(LeadRequest request) {
        if (request.telefono() != null && leadRepository.findByTelefono(request.telefono()).isPresent()) {
            throw new BusinessRuleException("Ya existe un Lead con el telefono: " + request.telefono());
        }
        Lead lead = leadMapper.toEntity(request);
        Lead guardado = leadRepository.save(lead);

        if (guardado.getEmail() != null && !guardado.getEmail().isBlank()) {
            enviarEmailBienvenida(guardado);
        }

        return leadMapper.toResponse(guardado);
    }

    @Transactional
    public LeadResponse actualizarDatos(Long id, LeadRequest request) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado"));

        // Detectar si estamos agregando el email por primera vez
        boolean noTeniaEmail = (lead.getEmail() == null || lead.getEmail().isBlank());
        boolean ahoraTieneEmail = (request.email() != null && !request.email().isBlank());

        lead.setNombre(request.nombre());
        lead.setEmail(request.email());
        lead.setTelefono(request.telefono());
        lead.setLastActivity(LocalDateTime.now());

        Lead actualizado = leadRepository.save(lead);

        // Si antes no tenía y ahora sí, enviamos el email de bienvenida automáticamente
        if (noTeniaEmail && ahoraTieneEmail) {
            enviarEmailBienvenida(actualizado);
        }

        return leadMapper.toResponse(actualizado);
    }

    public List<LeadResponse> listarLeads() {
        return leadMapper.toResponseList(leadRepository.findByDeletedAtIsNull());
    }

    public LeadResponse obtenerPorId(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));
        return leadMapper.toResponse(lead);
    }

    @Transactional
    public LeadResponse cambiarEstado(Long id, EstadoLead nuevoEstado) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        EstadoLead estadoAnterior = lead.getEstado();

        if (nuevoEstado == EstadoLead.CLIENTE && (lead.getEmail() == null || lead.getEmail().isBlank())) {
            throw new BusinessRuleException("No se puede pasar a CLIENTE sin un email registrado");
        }

        lead.setEstado(nuevoEstado);
        lead.setLastActivity(LocalDateTime.now());
        Lead actualizado = leadRepository.save(lead);

        interactionService.register(
                lead.getId(),
                InteractionType.CAMBIO_ESTADO,
                estadoAnterior.name() + " → " + nuevoEstado.name()
        );

        // Avisar al frontend que hubo un cambio de estado para que pinte la píldora central
        messagingTemplate.convertAndSend("/topic/lead/" + id, "UPDATE_HISTORY");
        return leadMapper.toResponse(actualizado);
    }

    //Conectar con R2
    @Transactional
    public void eliminarLead(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        UUID currentUserId = getCurrentUserId();
        
        lead.setDeletedAt(LocalDateTime.now());
        lead.setDeletedBy(currentUserId);
        leadRepository.save(lead);

        interactionService.register(id, InteractionType.CAMBIO_ESTADO,
                "Lead eliminado (Soft Delete) por usuario ID: " + currentUserId);
    }

    private UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return ((User) authentication.getPrincipal()).getId();
        }
        throw new IllegalStateException("Usuario no autenticado");
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

    @Transactional
    public LeadResponse marcarAtendido(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado con id: " + id));

        EstadoLead estadoAnterior = lead.getEstado();

        lead.setStale(false);
        if (lead.getEstado() == EstadoLead.NUEVO) {
            lead.setEstado(EstadoLead.EN_SEGUIMIENTO);
        }
        lead.setLastActivity(LocalDateTime.now());

        Lead guardado = leadRepository.save(lead);

        String mensajeHistorial = (estadoAnterior != lead.getEstado())
                ? "Lead atendido. El estado cambió automáticamente de " + estadoAnterior + " a " + lead.getEstado()
                : "Lead marcado como atendido (se limpió la alerta de inactividad)";

        interactionService.register(id, InteractionType.CAMBIO_ESTADO, mensajeHistorial);
        // Avisar al frontend para que quite el badge de "inactivo" al instante
        messagingTemplate.convertAndSend("/topic/lead/" + id, "UPDATE_HISTORY");
        return  leadMapper.toResponse(guardado);
    }

    // Coordination method for R3 (WhatsApp integration)
    public Optional<LeadResponse> findByTelefono(String telefono) {
        return leadRepository.findByTelefono(telefono).map(leadMapper::toResponse);
    }

    @Transactional
    public LeadResponse procesarMensajeWhatsApp(String telefono, String nombre, String mensaje) {
        Lead lead = leadRepository.findByTelefono(telefono)
                .orElseGet(() -> {
                    Lead nuevo = new Lead();
                    nuevo.setNombre(nombre);
                    nuevo.setTelefono(telefono);
                    return leadRepository.save(nuevo);
                });

        lead.setLastActivity(LocalDateTime.now());


        if (lead.getEstado() == EstadoLead.PERDIDO) {
            lead.setEstado(EstadoLead.EN_SEGUIMIENTO);
        }

        leadRepository.save(lead);

        // Registro de la interacción
        // NOTA: Si este método register() devuelve el DTO de la interacción guardada,
        // sería ideal guardarlo en una variable (ej: var interaction = interactionService.register(...))
        interactionService.register(lead.getId(), InteractionType.WHATSAPP_INCOMING, mensaje);

        // Disparamos el WebSocket al canal del Lead específico
        // Aquí enviamos un simple string "UPDATE_HISTORY", pero lo ideal es enviar el
        // DTO o JSON de la interacción que se acaba de guardar para que el frontend lo pinte de una vez.
        messagingTemplate.convertAndSend("/topic/lead/" + lead.getId(), "UPDATE_HISTORY");

        return leadMapper.toResponse(lead);
    }

    @Transactional
    public void responderPorWhatsApp(Long leadId, String mensajeAsesor) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead no encontrado"));

        if (lead.getTelefono() == null || lead.getTelefono().isBlank()) {
            throw new BusinessRuleException("El lead no tiene un teléfono registrado");
        }

        // 1. Enviar vía Twilio
        twilioWhatsAppService.enviarMensaje(lead.getTelefono(), mensajeAsesor);

        // 2. Registrar interacción saliente
        UUID currentUserId = getCurrentUserId();
        interactionService.register(
                lead.getId(),
                InteractionType.WHATSAPP_OUTGOING,
                "Respuesta del asesor: " + mensajeAsesor
        );

        // 3. Actualizar actividad
        lead.setLastActivity(LocalDateTime.now());
        leadRepository.save(lead);
        //Disparamos el WebSocket para que el chat del asesor se actualice
        messagingTemplate.convertAndSend("/topic/lead/" + lead.getId(), "UPDATE_HISTORY");
    }

    private void enviarEmailBienvenida(Lead lead) {
        emailService.sendWelcomeEmail(lead.getEmail(), lead.getNombre());
        interactionService.register(lead.getId(), InteractionType.EMAIL,
                "Email de bienvenida enviado a: " + lead.getEmail());
    }
}
