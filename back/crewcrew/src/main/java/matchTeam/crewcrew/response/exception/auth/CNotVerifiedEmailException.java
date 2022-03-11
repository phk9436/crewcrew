package matchTeam.crewcrew.response.exception.auth;

public class CNotVerifiedEmailException extends RuntimeException {
    public CNotVerifiedEmailException() {
        super();
    }

    public CNotVerifiedEmailException(String message) {
        super(message);
    }

    public CNotVerifiedEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}