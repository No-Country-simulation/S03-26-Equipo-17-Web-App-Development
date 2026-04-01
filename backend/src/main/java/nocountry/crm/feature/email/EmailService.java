package nocountry.crm.feature.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    /**
     * Envía un correo de bienvenida usando SMTP.
     */
    @Async
    public void sendWelcomeEmail(String toEmail, String leadName) {
        log.info("=== INICIANDO ENVIO DE EMAIL ===");
        log.info("Destinatario: {}", toEmail);
        log.info("Nombre del lead: {}", leadName);
        log.info("Email remitente configurado: {}", fromEmail);
        log.info("SMTP host: smtp.gmail.com");
        log.info("SMTP port: 465");
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // true indica que es un mensaje "multipart" (necesario para HTML)
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("¡Gracias por contactarnos, " + leadName + "!");

            // Aquí generamos el contenido HTML
            String htmlContent = buildWelcomeHtml(leadName);

            // true en el segundo parámetro indica que el contenido es HTML
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Email de bienvenida enviado exitosamente a {} vía SMTP", toEmail);

        } catch (MessagingException e) {
            log.error("Error al construir el email para {}: Mensaje={}", toEmail, e.getMessage());
            log.error("Stack trace completo:", e);
            // Detectar tipos específicos de errores
            if (e.getMessage() != null && e.getMessage().contains("Connection")) {
                log.error("ERROR DE CONEXIÓN SMTP: Verificar red/servidor/firewall");
            } else if (e.getMessage() != null && e.getMessage().contains("Authentication")) {
                log.error("ERROR DE AUTENTICACIÓN: Verificar usuario y contraseña SMTP");
            }
        } catch (Exception e) {
            log.error("Error inesperado al enviar email a {}: Tipo={}, Mensaje={}", toEmail, e.getClass().getSimpleName(), e.getMessage());
            log.error("Stack trace completo:", e);
            // Si es un error de timeout (common en producción)
            if (e.getMessage() != null && (e.getMessage().contains("timeout") || e.getMessage().contains("timed out"))) {
                log.error("TIMEOUT DETECTADO: El servidor SMTP no responde. Possible problema: IP bloqueada por Gmail o firewall");
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
                        <p>Gracias por comunicarte con nosotros. Hemos recibido tu mensaje y uno de nuestros asesores se pondrá en contacto contigo a la brevedad.</p>
                        <p>En nuestro CRM nos tomamos en serio tu tiempo, así que no tardaremos.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 0.9em; color: #7f8c8d;">Si tienes alguna pregunta urgente, puedes responder directamente a este correo.</p>
                        <p><strong>El equipo de CRM</strong></p>
                    </div>
                </body>
                </html>
                """.formatted(nombre);
    }
}