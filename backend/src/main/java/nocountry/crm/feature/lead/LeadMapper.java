package nocountry.crm.feature.lead;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeadMapper {

    public Lead toEntity(LeadRequest request) {
        Lead lead = new Lead();
        lead.setNombre(request.nombre());
        lead.setEmail(request.email());
        lead.setTelefono(request.telefono());
        return lead;
    }

    public LeadResponse toResponse(Lead lead) {
        return LeadResponse.builder()
                .id(lead.getId())
                .nombre(lead.getNombre())
                .email(lead.getEmail())
                .telefono(lead.getTelefono())
                .estado(lead.getEstado().name())
                .stale(lead.getStale())
                .createdAt(lead.getCreatedAt())
                .lastActivity(lead.getLastActivity())
                .build();
    }

    public List<LeadResponse> toResponseList(List<Lead> leads) {
        return leads.stream()
                .map(this::toResponse)
                .toList();
    }
}
