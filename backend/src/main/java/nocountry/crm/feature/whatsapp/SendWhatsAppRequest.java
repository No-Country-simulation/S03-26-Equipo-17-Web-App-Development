package nocountry.crm.feature.whatsapp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendWhatsAppRequest(
        @NotNull Long leadId,
        @NotBlank String message
) {}