package nocountry.crm.feature.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LeadRequest (
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @Email(message = "El email no tiene formato valido")
        String email,
        String telefono
){
}
