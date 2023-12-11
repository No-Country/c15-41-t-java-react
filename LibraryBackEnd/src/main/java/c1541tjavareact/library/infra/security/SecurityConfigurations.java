package c1541tjavareact.library.infra.security;

import jakarta.validation.constraints.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author jdmon on 5/12/2023
 * @project challenge-one-foro-alura
 */
@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    private final SecurityFilter securityFilter;

    public SecurityConfigurations(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> {
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .maximumSessions(1);
            session.sessionFixation(SessionManagementConfigurer
                                        .SessionFixationConfigurer::migrateSession);
            })
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.POST,
                            "/auth/login")
                    .permitAll()
                    .anyRequest().authenticated()
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NotNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://frontend-27zf.onrender.com/",
                                "http://localhost:8080/",
                                "http://localhost:5173",
                                "http://localhost")
                        .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
