package nocountry.crm.feature.metrics;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MetricsFilter(
        @NotNull(message = "La fecha de inicio es obligatoria")
        @Parameter(description = "Desde", example = "2025-01-01")
        LocalDate from,

        @NotNull(message = "La fecha de fin es obligatoria")
        @Parameter(description = "Hasta", example = "2025-12-31")
        LocalDate to
) {
}
