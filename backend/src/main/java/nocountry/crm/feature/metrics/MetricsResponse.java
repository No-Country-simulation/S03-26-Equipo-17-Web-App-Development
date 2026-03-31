package nocountry.crm.feature.metrics;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.Map;

@Schema(description = "Contiene las estadísticas detalladas del CRM.")
public record MetricsResponse(

    @Schema(description = "Leads registrados en el periodo seleccionado.", example = "150")
    long totalLeads,

    @Schema(description = "Leads agrupados según su estado actual.",
            example = "{\"NUEVO\": 50, \"EN_SEGUIMIENTO\": 70, \"CLIENTE\": 30 }")
    Map<String, Long> leadsByStatus,

    @Schema(description = "Porcentaje de Leads que cambiaron su estado a CLIENTE", example = "20.5")
    double conversionRate,

    @Schema(description = "Leads que no han tenido interacción reciente.", example = "12")
    long staleLeadsCount,

    @Schema(description = "Fecha inicial del reporte." , example = "2024-01-01")
    LocalDate from,

    @Schema(description = "Fecha final del reporte.", example = "2024-03-26")
    LocalDate to
    ){}
