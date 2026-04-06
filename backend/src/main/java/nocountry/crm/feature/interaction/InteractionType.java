package nocountry.crm.feature.interaction;

public enum InteractionType {
    WHATSAPP,             // legacy - kept for backward compatibility
    WHATSAPP_INCOMING,    // mensaje recibido del lead
    WHATSAPP_OUTGOING,    // respuesta enviada por el asesor
    EMAIL,
    CAMBIO_ESTADO
}
