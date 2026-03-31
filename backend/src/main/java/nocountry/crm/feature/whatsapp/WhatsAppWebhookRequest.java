package nocountry.crm.feature.whatsapp;

/**
 * Maps the form-encoded payload sent by Twilio when a WhatsApp message arrives.
 * Twilio sends Content-Type: application/x-www-form-urlencoded.
 *
 * Key fields from Twilio:
 *   From        → "whatsapp:+1234567890"  (sender's WhatsApp number)
 *   Body        → message content
 *   ProfileName → sender's display name on WhatsApp
 *   WaId        → phone number digits only, without "whatsapp:+" prefix
 */
public record WhatsAppWebhookRequest(
        String From,
        String Body,
        String ProfileName,
        String WaId
) {
    /**
     * Returns the clean phone number (e.g. "+5491112345678")
     * stripping the "whatsapp:" prefix that Twilio adds.
     */
    public String cleanPhone() {
        // WaId contains only digits (e.g. "5491112345678"), more reliable than parsing From
        if (WaId != null && !WaId.isBlank()) return "+" + WaId.strip();
        if (From == null) return null;
        // Fallback: strip "whatsapp:" and any spaces (+ is decoded as space in form-urlencoded)
        return From.replace("whatsapp:", "").replace(" ", "").strip();
    }
}
