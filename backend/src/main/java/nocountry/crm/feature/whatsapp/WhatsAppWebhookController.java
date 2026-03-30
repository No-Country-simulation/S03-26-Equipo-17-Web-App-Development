package nocountry.crm.feature.whatsapp;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            Receives POST from Twilio when a WhatsApp message arrives.
            Automatically creates a new Lead if the phone number is not registered,
            or updates lastActivity if it already exists.
            Registers the message in the interaction history (type: WHATSAPP).
            If the Lead has an email, sends a welcome email via Resend.
            Returns an empty TwiML response as required by Twilio.
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

        // Find existing lead or create new one
        LeadResponse lead = leadService.findByTelefono(telefono)
                .orElseGet(() -> {
                    LeadResponse nuevoLead = leadService.crearLead(
                            new LeadRequest(nombre, null, telefono)
                    );
                    log.info("New lead created from WhatsApp: id={}", nuevoLead.getId());
                    return nuevoLead;
                });

        // Register the WhatsApp message in interaction history
        interactionService.register(lead.getId(), InteractionType.WHATSAPP, mensaje);

        // Send welcome email only if lead has email (new leads from WhatsApp don't have one by default)
        if (lead.getEmail() != null && !lead.getEmail().isBlank()) {
            emailService.sendWelcomeEmail(lead.getEmail(), lead.getNombre());
            interactionService.register(lead.getId(), InteractionType.EMAIL,
                    "Welcome email sent to " + lead.getEmail());
        }

        // Twilio requires an empty TwiML response to not auto-reply
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .body("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>");
    }
}
