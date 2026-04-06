package nocountry.crm.feature.interaction;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Tag(name = "Interaction History", description = "Timeline of messages and events for a Lead")
public class InteractionController {

    private final InteractionService interactionService;

    @GetMapping("/{id}/history")
    @Operation(
        summary = "Get interaction history of a Lead",
        description = """
            Returns the full timeline of events for a given Lead, ordered from most recent to oldest.
            Each entry represents one of the following event types:
            - WHATSAPP: an incoming WhatsApp message received via Twilio
            - EMAIL: a welcome email sent automatically via Resend
            - CAMBIO_ESTADO: a status change (e.g. NUEVO → EN_SEGUIMIENTO)

            Supports pagination via query parameters: page (0-based), size, sort.
            """
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "History retrieved successfully",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = InteractionResponse.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid sort field. Allowed values: id, leadId, type, content, createdAt",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Lead not found",
            content = @Content
        )
    })
    public ResponseEntity<Page<InteractionResponse>> getHistory(
            @Parameter(description = "ID of the Lead", required = true, example = "1")
            @PathVariable Long id,
            @Parameter(description = "Número de página (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Cantidad de registros por página", example = "20")
            @RequestParam(defaultValue = "20") int size) {

        return ResponseEntity.ok(interactionService.getHistory(id, PageRequest.of(page, size)));
    }
}
