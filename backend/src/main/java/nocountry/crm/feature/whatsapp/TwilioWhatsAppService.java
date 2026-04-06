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
    private String whatsappFrom;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        log.info("Twilio inicializado correctamente");
    }

    public String enviarMensaje(String toPhone, String body) {
        try {
            // Aseguramos formato whatsapp:+549...
            String toFormatted = toPhone.startsWith("whatsapp:") ? toPhone : "whatsapp:" + toPhone;

            Message message = Message.creator(
                    new PhoneNumber(toFormatted),
                    new PhoneNumber(whatsappFrom),
                    body
            ).create();

            log.info("WhatsApp enviado. SID: {}", message.getSid());
            return message.getSid();
        } catch (Exception e) {
            log.error("Error Twilio: {}", e.getMessage());
            throw new RuntimeException("Error al enviar WhatsApp a través de Twilio", e);
        }
    }
}