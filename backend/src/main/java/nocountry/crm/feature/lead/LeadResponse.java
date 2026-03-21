package nocountry.crm.feature.lead;


import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDateTime;

@Value
@Builder
@Jacksonized
public class LeadResponse {
    Long id;
    String nombre;
    String email;
    String telefono;
    String estado;
    Boolean stale;
    LocalDateTime createdAt;
    LocalDateTime lastActivity;
}
