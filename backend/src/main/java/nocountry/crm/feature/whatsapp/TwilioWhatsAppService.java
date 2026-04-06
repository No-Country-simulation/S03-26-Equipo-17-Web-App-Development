package nocountry.crm.feature.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TwilioWhatsAppService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp-from}")
    private String whatsappFrom;   // ejemplo: "whatsapp:+14155238886"

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        log.info("Twilio inicializado para WhatsApp Sandbox");
    }

    /**
     * Envía un mensaje de WhatsApp a un número.
     * @param toPhone Número con formato internacional (ej: "+5491112345678")
     * @param body Texto del mensaje
     * @return SID del mensaje enviado
     */
    public String enviarMensaje(String toPhone, String body) {
        try {
            // Twilio espera el formato: whatsapp:+5491112345678
            String toFormatted = "whatsapp:" + toPhone;

            Message message = Message.creator(
                    new PhoneNumber(toFormatted),
                    new PhoneNumber(whatsappFrom),
                    body
            ).create();

            log.info("Mensaje WhatsApp enviado - SID: {} - To: {}", message.getSid(), toPhone);
            return message.getSid();

        } catch (Exception e) {
            log.error("Error enviando mensaje WhatsApp a {}: {}", toPhone, e.getMessage(), e);
            throw new RuntimeException("No se pudo enviar el mensaje por WhatsApp: " + e.getMessage(), e);
        }
    }
}
