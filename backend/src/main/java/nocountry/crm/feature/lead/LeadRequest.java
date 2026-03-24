package nocountry.crm.feature.lead;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "DTO para la creación de un nuevo lead")
public record LeadRequest (
        @Schema(description = "Nombre completo del lead", example = "Juan Pérez", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        
        @Schema(description = "Correo electrónico del lead", example = "juan.perez@email.com", requiredMode = Schema.RequiredMode.REQUIRED)
        @Email(message = "El email no tiene formato valido")
        String email,
        
        @Schema(description = "Número de teléfono del lead", example = "+5491123456789")
        String telefono
){
}
