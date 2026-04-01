package nocountry.crm.feature.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
@Slf4j
public class EmailService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.brevo.api.key}")
    private String brevoApiKey;

    @Value("${app.brevo.from.email:noreply@brevo.com}")
    private String fromEmail;

    @Value("${app.brevo.from.name:CRM Team}")
    private String fromName;

    public EmailService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Envía un correo de bienvenida usando Brevo API via HTTP.
     */
    @Async
    public void sendWelcomeEmail(String toEmail, String leadName) {
        log.info("=== INICIANDO ENVIO DE EMAIL VIA BREVO (HTTP) ===");
        log.info("Destinatario: {}", toEmail);
        log.info("Nombre del lead: {}", leadName);
        log.info("Email remitente: {} ({})", fromEmail, fromName);
        log.info("API Key configurada: {}", brevoApiKey != null && !brevoApiKey.isEmpty() ? "YES" : "NO");

        if (brevoApiKey == null || brevoApiKey.isEmpty()) {
            log.error("ERROR: BREVO_API_KEY no está configurada");
            return;
        }

        try {
            // Construir el contenido HTML
            String htmlContent = buildWelcomeHtml(leadName);

            // Crear el body del request usando Map
            Map<String, Object> emailData = new HashMap<>();

            // Sender info
            Map<String, String> sender = new HashMap<>();
            sender.put("name", fromName);
            sender.put("email", fromEmail);
            emailData.put("sender", sender);

            // To recipients (array of objects)
            Map<String, String> recipient = new HashMap<>();
            recipient.put("email", toEmail);
            recipient.put("name", leadName);
            emailData.put("to", List.of(recipient));

            // Subject and HTML
            emailData.put("subject", "¡Gracias por contactarnos, " + leadName + "!");
            emailData.put("htmlContent", htmlContent);

            // Convertir a JSON usando ObjectMapper
            String requestBody = objectMapper.writeValueAsString(emailData);

            // Configurar headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", brevoApiKey);

            // Crear request
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // Enviar request a Brevo API
            String apiUrl = "https://api.brevo.com/v3/smtp/email";
            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.CREATED || response.getStatusCode() == HttpStatus.OK) {
                log.info("Email enviado exitosamente a {}", toEmail);
                log.info("=== EMAIL ENVIADO VIA BREVO ===");
            } else {
                log.error("Error al enviar email: Status={}, Body={}", response.getStatusCode(), response.getBody());
            }

        } catch (Exception e) {
            log.error("Error al enviar email a {}: Tipo={}, Mensaje={}", toEmail, e.getClass().getSimpleName(), e.getMessage());
            log.error("Stack trace completo:", e);

            // Detectar tipos específicos de errores
            if (e.getMessage() != null) {
                if (e.getMessage().contains("401") || e.getMessage().contains("unauthorized")) {
                    log.error("ERROR DE AUTENTICACIÓN: API key de Brevo inválida o expirada");
                } else if (e.getMessage().contains("timeout") || e.getMessage().contains("timed out")) {
                    log.error("TIMEOUT: El servidor de Brevo no responde");
                } else if (e.getMessage().contains("403") || e.getMessage().contains("forbidden")) {
                    log.error("ERROR DE PERMISOS: Verificar permisos de la API key");
                }
            }
        }
    }

    private String buildWelcomeHtml(String nombre) {
        return """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #2c3e50;">¡Hola, %s!</h2>
                        <p>Gracias por comunicarte con nosotros. Hemos recibido tu mensaje y uno de nuestros asesores se pondra en contacto contigo a la brevedad.</p>
                        <p>En nuestro CRM nos tomamos en serio tu tiempo, asi que no tardaremos.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 0.9em; color: #7f8c8d;">Si tienes alguna pregunta urgente, puedes responder directamente a este correo.</p>
                        <p><strong>El equipo de CRM</strong></p>
                    </div>
                </body>
                </html>
                """.formatted(nombre);
    }
}