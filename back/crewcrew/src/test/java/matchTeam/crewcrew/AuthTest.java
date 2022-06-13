package matchTeam.crewcrew;

import matchTeam.crewcrew.dto.security.ResponseTokenDto;
import matchTeam.crewcrew.dto.security.TokenDto;
import matchTeam.crewcrew.dto.user.UserLoginRequestDto;
import matchTeam.crewcrew.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class AuthTest {

    @Autowired
    UserService userService;
    @Test
    public void 로그인_중복() throws Exception{
        UserLoginRequestDto request = new UserLoginRequestDto("kimth007kim@naver.com","a12345678!",false);
//        Optional<User> id = userService.findByEmailAndProvider("kimth007kim@naver.com","local");
//        System.out.println(id.get());
        ResponseTokenDto tokendto  = userService.login(request);
        ResponseTokenDto tokendto1  = userService.login(request);
        ResponseTokenDto tokendto2  = userService.login(request);
        ResponseTokenDto tokendto3  = userService.login(request);



    }
}
