package nocountry.crm.shared.exception;

public class BusinessRuleException extends RuntimeException{
    public BusinessRuleException(String mensaje) {
        super(mensaje);
    }
}
