package matchTeam.crewcrew.response.exception.auth;

import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ErrorResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class AuthExceptionHandler {


    // 1000~1099 이메일 회원가입 에 대한 예외

    /**
     * 1001
     * SendEmail
     * 이메일 형식이 유효하지 않을 때 발생하는 예외
     */
    @ExceptionHandler(CNotValidEmailException.class)
    protected ResponseEntity<ErrorResponseHandler> emailnotValidException(CNotValidEmailException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMAIL_NOT_VALID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 1002
     * SendEmail
     * 이미 가입이 되어있는 회원일 경우에 발생하는 예외
     */
    @ExceptionHandler(CUserAlreadyExistException.class)
    protected ResponseEntity<ErrorResponseHandler> userAlreadyExistException(CUserAlreadyExistException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.USER_ALREADY_EXIST);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 1003
     * CodeVerify
     * 인증코드가 이메일과 다른 경우에 발생하는 예외
     */
    @ExceptionHandler(CEmailCodeNotMatchException.class)
    protected ResponseEntity<ErrorResponseHandler> emailCodeMatchException(CEmailCodeNotMatchException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMAIL_CODE_NOT_MATCH);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 1004
     * signup
     * 이메일 인증코드가 인증되지않았을때 발생하는 예외
     */
    @ExceptionHandler(CNotVerifiedEmailException.class)
    protected ResponseEntity<ErrorResponseHandler> emailSendException(CNotVerifiedEmailException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.EMAIL_CODE_NOT_VERIFIED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 1005
     * 이메일 회원가입할때 할때 이미 존재하는 이메일로 회원가입을 했을때 발생하는 예외
     * signup
     */
    @ExceptionHandler(EmailSignUpFailedCException.class)
    protected ResponseEntity<ErrorResponseHandler> signUpFailedException(EmailSignUpFailedCException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.SIGN_UP_EMAIL_ALREADY_EXIST_FAILED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1006
     * 비밀번호 변경시 패스워드가 일치하지 않을때
     * signup
     */
    @ExceptionHandler(CPasswordNotMatchException.class)
    protected ResponseEntity<ErrorResponseHandler> passwordNotMatchException(CPasswordNotMatchException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.PASSWORD_NOT_MATCH);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 1100~1199 이메일 로그인에 대한 예외

    /**
     * 1101
     * 이메일 로그인을 할때 이메일이 존재하지않을때 예외처리를 발생한다.
     * login
     */
    @ExceptionHandler(LoginFailedByEmailNotExistException.class)
    protected ResponseEntity<ErrorResponseHandler> emailLoginFailedException(LoginFailedByEmailNotExistException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.LOGIN_FAILED_BY_EMAIL);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 1102
     * 이메일 로그인을 할때 이메일과 비밀번호과 맞지않을때 예외처리를 발생한다.
     * login
     */
    @ExceptionHandler(LoginFailedByPasswordException.class)
    protected ResponseEntity<ErrorResponseHandler> loginFailedByPasswordException(LoginFailedByPasswordException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.LOGIN_FAILED_BY_PASSWORD);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 1301~1399 카카오 로그인 회원가입에 대한 예외
    /**
     * 1300
     * 카카오와 통신을 실패했을때 예외
     * kakaoService
     */
    @ExceptionHandler(CKakaoCommunicationException.class)
    protected ResponseEntity<ErrorResponseHandler> kakaoCommunicationException(CKakaoCommunicationException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.KAKAO_COMMUNICATION_FAILED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1301
     * 카카오 회원가입을 할때 이미 해당이메일로 카카오 회원가입이 되어있을경우 예외
     * kakaoSignUp
     */
    @ExceptionHandler(CKakaoUserAlreadyExistException.class)
    protected ResponseEntity<ErrorResponseHandler> kakaoUserAlreadyExistException(CKakaoUserAlreadyExistException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.KAKAKO_USER_ALREADY_EXIST);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 1400~1499 네이버 로그인 회원가입에 대한 예외
    /**
     * 1400
     * 카카오와 통신을 실패했을때 예외
     * naverService
     */
    @ExceptionHandler(CNaverCommunicationException.class)
    protected ResponseEntity<ErrorResponseHandler> naverCommunicationException(CNaverCommunicationException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NAVER_COMMUNICATION_FAILED);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1401
     * 네이버 회원가입을 할때 이미 해당이메일로 네이버 회원가입이 되어있을경우 예외
     * naverSignUp
     */
    @ExceptionHandler(CNaverUserAlreadyExistException.class)
    protected ResponseEntity<ErrorResponseHandler> naverUserAlreadyExistException(CNaverUserAlreadyExistException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.NAVER_USER_ALREADY_EXIST);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 1900~1999 토큰 관련 예외
    /**
     * 1900
     * 엑세스 토큰에 해당하는 유저가없을때
     * token
     */
    @ExceptionHandler(CInvalidTokenException.class)
    protected ResponseEntity<ErrorResponseHandler> invalidTokenException(CInvalidTokenException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_TOKEN);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1901
     * 유효하지 않은 리프레시 토큰일때
     * reissue
     */
    @ExceptionHandler(CInvalidRefreshTokenException.class)
    protected ResponseEntity<ErrorResponseHandler> invalidRefreshToken(CUserNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.INVALID_REFRESH_TOKEN);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1902
     * Refresh토큰이 DB에 저장되어있지않을때
     * reissue
     */
    @ExceptionHandler(CUserNotFoundException.class)
    protected ResponseEntity<ErrorResponseHandler> userNotFoundException(CUserNotFoundException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.PK_USER_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1903
     * 입력받은 Refresh토큰이 DB에 저장되어있지 않습니다.
     * reissue
     */
    @ExceptionHandler(CRefreshTokenNotExistInDBException.class)
    protected ResponseEntity<ErrorResponseHandler> refreshTokenNotExistDB(CRefreshTokenNotExistInDBException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.REFRESH_TOKEN_NOT_EXIST_DB);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /**
     * 1904
     * 입력받은 Refresh토큰이 DB에 저장된 Refresh토큰과 다릅니다.
     * reissue
     */
    @ExceptionHandler(CRefreshTokenNotMatchWithInputException.class)
    protected ResponseEntity<ErrorResponseHandler> refreshTokenNotMatchWithInput(CRefreshTokenNotMatchWithInputException e){
        final ErrorResponseHandler response = ErrorResponseHandler.of(ErrorCode.REFRESH_TOKEN_NOT_MATCH);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }





















}