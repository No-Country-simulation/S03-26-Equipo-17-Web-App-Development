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
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        log.info("Twilio SDK initialized (from={})", fromNumber);
    }

    /**
     * Sends a WhatsApp message to the given phone number.
     *
     * @param toPhone phone number in E.164 format, e.g. "+5491112345678"
     * @param body    message text (max 1600 chars)
     */
    public void enviarMensaje(String toPhone, String body) {
        String toWhatsApp = toPhone.startsWith("whatsapp:") ? toPhone : "whatsapp:" + toPhone;

        Message message = Message.creator(
                new PhoneNumber(toWhatsApp),
                new PhoneNumber(fromNumber),
                body
        ).create();

        log.info("WhatsApp message sent to {} - SID: {}", toPhone, message.getSid());
    }
}
