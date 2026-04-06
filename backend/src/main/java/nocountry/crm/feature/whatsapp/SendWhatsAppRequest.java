package nocountry.crm.feature.whatsapp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SendWhatsAppRequest(
        @NotBlank(message = "El mensaje no puede estar vacío")
        @Size(max = 1600, message = "El mensaje no puede superar 1600 caracteres")
        String message
) {}
