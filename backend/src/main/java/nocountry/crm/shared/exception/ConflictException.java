package nocountry.crm.shared.exception;

public class ConflictException extends RuntimeException{
    public ConflictException(String mensaje) {
        super(mensaje);
    }
}
