package nocountry.crm.shared.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // El prefijo para los canales a los que se suscribirá el frontend
        config.enableSimpleBroker("/topic");
        // El prefijo para los mensajes que el frontend envíe al backend (si aplica)
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // La URL a la que se conectará tu frontend
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Permite CORS igual que tu CorsConfig
                .withSockJS(); // Soporte de respaldo por si fallan los WebSockets puros
    }
}