package matchTeam.crewcrew.config;

import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class SpringConfig {
    private final EntityManager em;


    public SpringConfig( EntityManager em) {
        this.em = em;
    }

//    @Bean
//    public UserService userService(){
//        return new UserService(userRepository());
//    }
//    @Bean
//    public UserRepository userRepository(){
//        return new JpaUserRepository(em);
//    }
}

