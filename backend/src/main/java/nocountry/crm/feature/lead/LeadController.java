package nocountry.crm.feature.lead;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Tag(name = "Leads", description = "API para la gestión de leads")
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    @Operation(summary = "Crear un nuevo lead", description = "Crea un nuevo lead en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Lead creado exitosamente",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = LeadResponse.class))),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<LeadResponse> crearLead(
            @Parameter(description = "Datos del lead a crear", required = true)
            @Valid @RequestBody LeadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.crearLead(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar datos de un lead", description = "Permite editar nombre, email o teléfono")
    public ResponseEntity<LeadResponse> actualizarLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request) {
        return ResponseEntity.ok(leadService.actualizarDatos(id, request));
    }

    @GetMapping
    @Operation(summary = "Listar todos los leads", description = "Obtiene una lista de todos los leads registrados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de leads obtenida exitosamente",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = LeadResponse.class)))
    })
    public ResponseEntity<List<LeadResponse>> listarLeads() {
        return ResponseEntity.ok(leadService.listarLeads());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener lead por ID", description = "Busca un lead específico por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lead encontrado exitosamente",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = LeadResponse.class))),
        @ApiResponse(responseCode = "404", description = "Lead no encontrado")
    })
    public ResponseEntity<LeadResponse> obtenerPorId(
            @Parameter(description = "ID del lead a buscar", required = true)
            @PathVariable Long id) {
        return ResponseEntity.ok(leadService.obtenerPorId(id));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Cambiar estado de un lead", description = "Actualiza el estado de un lead específico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Estado del lead actualizado exitosamente",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = LeadResponse.class))),
        @ApiResponse(responseCode = "404", description = "Lead no encontrado")
    })
    public ResponseEntity<LeadResponse> cambiarEstado(
            @Parameter(description = "ID del lead a actualizar", required = true)
            @PathVariable Long id,
            @Parameter(description = "Nuevo estado del lead", required = true)
            @RequestParam EstadoLead nuevoEstado) {
        return ResponseEntity.ok(leadService.cambiarEstado(id, nuevoEstado));
    }

    @PatchMapping("/{id}/atender")
    @Operation(summary = "Marcar lead como atendido", description = "Marca un lead específico como atendido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lead marcado como atendido exitosamente",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = LeadResponse.class))),
        @ApiResponse(responseCode = "404", description = "Lead no encontrado")
    })
    public ResponseEntity<LeadResponse> marcarAtendido(
            @Parameter(description = "ID del lead a marcar como atendido", required = true)
            @PathVariable Long id) {
        return ResponseEntity.ok(leadService.marcarAtendido(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un lead", description = "Elimina un lead específico del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Lead eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Lead no encontrado")
    })
    public ResponseEntity<Void> eliminarLead(
            @Parameter(description = "ID del lead a eliminar", required = true)
            @PathVariable Long id) {
        leadService.eliminarLead(id);
        return ResponseEntity.noContent().build();
    }

}
