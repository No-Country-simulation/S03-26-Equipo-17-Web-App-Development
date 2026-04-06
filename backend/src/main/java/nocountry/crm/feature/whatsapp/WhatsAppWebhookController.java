package nocountry.crm.feature.whatsapp;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nocountry.crm.feature.email.EmailService;
import nocountry.crm.feature.interaction.InteractionService;
import nocountry.crm.feature.interaction.InteractionType;
import nocountry.crm.feature.lead.LeadRequest;
import nocountry.crm.feature.lead.LeadResponse;
import nocountry.crm.feature.lead.LeadService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/whatsapp")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "WhatsApp Webhook", description = "Receives incoming WhatsApp messages forwarded by Twilio")
public class WhatsAppWebhookController {

    private final LeadService leadService;
    private final InteractionService interactionService;
    private final EmailService emailService;

    /**
     * Twilio calls this endpoint every time a WhatsApp message arrives.
     * Content-Type is application/x-www-form-urlencoded (not JSON).
     *
     * Flow:
     *  1. Extract phone number and message from Twilio payload
     *  2. Find existing Lead by phone OR create a new one
     *  3. Register the message in interaction history
     *  4. If new Lead has email → send welcome email
     *  5. Return empty TwiML (Twilio expects this format)
     */
    @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @Operation(
        summary = "Twilio WhatsApp webhook",
        description = """
            Recibe POST de Twilio cuando llega un mensaje de WhatsApp.
            Crea automáticamente un nuevo Lead si el número de teléfono no está registrado,
            o actualiza lastActivity si ya existe.
            Registra el mensaje en el historial de interacciones (tipo: WHATSAPP).
            Si el Lead tiene un correo electrónico, envía un correo de bienvenida a través de Resend.
            Devuelve una respuesta TwiML vacía según lo requiere Twilio.
            """,
        responses = {
            @ApiResponse(responseCode = "200", description = "Webhook processed successfully")
        }
    )
    public ResponseEntity<String> receiveMessage(@ModelAttribute WhatsAppWebhookRequest request) {
        log.info("WhatsApp message received from {} - body: {}", request.From(), request.Body());

        String telefono = request.cleanPhone();
        String nombre = request.ProfileName() != null ? request.ProfileName() : "WhatsApp User";
        String mensaje = request.Body();

        leadService.procesarMensajeWhatsApp(telefono, nombre, mensaje);

        String twiml = """
                <?xml version="1.0" encoding="UTF-8"?>
                <Response>
                    <Message>✅ Mensaje recibido. Un asesor te responderá pronto.</Message>
                </Response>
                """;

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .body(twiml);
    }

    @PostMapping("/send")
    @Operation(summary = "Enviar respuesta manual", description = "El asesor envía un mensaje al WhatsApp del cliente")
    public ResponseEntity<Void> sendMessage(@Valid @RequestBody SendWhatsAppRequest request) {
        leadService.responderPorWhatsApp(request.leadId(), request.message());
        return ResponseEntity.ok().build();
    }
}
