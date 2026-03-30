package nocountry.crm.feature.email;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final Resend resend;
    private final String fromEmail;

    public EmailService(
            @Value("${resend.api-key}") String apiKey,
            @Value("${resend.from-email}") String fromEmail) {
        this.resend = new Resend(apiKey);
        this.fromEmail = fromEmail;
    }

    /**
     * Sends a welcome email to a newly created Lead.
     * Called by WhatsAppWebhookController after creating a Lead with email.
     */
    public void sendWelcomeEmail(String toEmail, String leadName) {
        try {
            CreateEmailOptions email = CreateEmailOptions.builder()
                    .from(fromEmail)
                    .to(toEmail)
                    .subject("¡Gracias por contactarnos, " + leadName + "!")
                    .html(buildWelcomeHtml(leadName))
                    .build();

            resend.emails().send(email);
            log.info("Welcome email sent to {}", toEmail);

        } catch (Exception e) {
            // Log but don't fail the main flow — email is best-effort
            log.error("Failed to send welcome email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String buildWelcomeHtml(String nombre) {
        return """
                <h2>¡Hola, %s!</h2>
                <p>Gracias por comunicarte con nosotros. Uno de nuestros asesores se pondrá en contacto contigo a la brevedad.</p>
                <p>Mientras tanto, si tenés alguna pregunta, podés responder a este correo.</p>
                <br>
                <p><strong>El equipo de CRM</strong></p>
                """.formatted(nombre);
    }
}
