package nocountry.crm.feature.metrics;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/metrics")
@RequiredArgsConstructor
@Tag(name = "Metrics", description = "Endpoints para Dashboard y reportes.")
public class MetricsController {

    private final MetricsService metricsService;
    private final CsvExportService exportService;

    @GetMapping("/stats")
    @Operation(
            summary = "Obtener estadísticas",
            description = "Calcula métricas globales, conversiones y leads filtrado por fechas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estadísticas calculadas con éxito.",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MetricsResponse.class))),
            @ApiResponse(responseCode = "400", description = "Rago de fechas inválido o formato incorrecto."),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor.")
    })
    public ResponseEntity<MetricsResponse> obtenerEstadisticas (@Valid MetricsFilter filter) {

        return ResponseEntity.ok(metricsService.getGlobalStats(filter));
    }

    @GetMapping("/export")
    @Operation(
            summary = "Exportar Leads a CSV",
            description = "Genera y descarga un archivo CSV con el detalle de los Leads filtrado por un rago de fechas específico."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Archivo CSV genaro y listo para descargar.",
                    content = @Content(mediaType = "text/csv",
                    schema = @Schema(type = "string", format = "binary"))),
            @ApiResponse(responseCode = "400", description = "Parátros de filtro incorrectos."),
            @ApiResponse(responseCode = "500", description = "Error al generar el archivo de exportación.")
    })
    public ResponseEntity<Resource> exportLeads (@Valid MetricsFilter filter) {
        ExportFileResponse export = exportService.getLeadsCsvExport(filter);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + export.fileName())
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(export.resource());
    }
}
