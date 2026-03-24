package nocountry.crm.feature.metrics;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
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

    @GetMapping("/stats")
    @Operation(
            summary = "Obtener estadísticas",
            description = "Calcula métricas globales, conversiones y leads filtrado por fechas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estadísticas calculadas con éxito",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MetricsResponse.class))),
            @ApiResponse(responseCode = "400", description = "Rago de fechas inválido o formato incorrecto."),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor.")
    })
    public ResponseEntity<MetricsResponse> obtenerEstadisticas (@Valid MetricsFilter filter) {

        return ResponseEntity.ok(metricsService.getGlobalStats(filter));
    }
}
