package nocountry.crm.feature.interaction;

import lombok.RequiredArgsConstructor;
import nocountry.crm.feature.lead.LeadService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InteractionService {

    private final InteractionRepository interactionRepository;
    private final LeadService leadService;

    /**
     * Returns the interaction history of a Lead, ordered by date descending.
     * Throws ResourceNotFoundException if the Lead does not exist.
     */
    public Page<InteractionResponse> getHistory(Long leadId, Pageable pageable) {
        leadService.obtenerPorId(leadId); // validates lead exists
        return interactionRepository
                .findByLeadIdOrderByCreatedAtDesc(leadId, pageable)
                .map(this::toResponse);
    }

    /**
     * Records a new event in the interaction history.
     * Called by WhatsAppWebhookController and EmailService (Part 2).
     */
    public void register(Long leadId, InteractionType type, String content) {
        Interaction interaction = new Interaction();
        interaction.setLeadId(leadId);
        interaction.setType(type);
        interaction.setContent(content);
        interactionRepository.save(interaction);
    }

    private InteractionResponse toResponse(Interaction interaction) {
        return InteractionResponse.builder()
                .id(interaction.getId())
                .leadId(interaction.getLeadId())
                .type(interaction.getType().name())
                .content(interaction.getContent())
                .createdAt(interaction.getCreatedAt())
                .build();
    }
}
