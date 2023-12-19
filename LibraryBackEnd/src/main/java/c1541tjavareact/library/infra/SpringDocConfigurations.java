package c1541tjavareact.library.infra;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author jdmon on 3/10/2023.
 * @project api-med-voll
 */
@Configuration
public class SpringDocConfigurations {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .info(new Info()
                        .title("Bibliotech")
                        .version("v1")
                        .description("API-Rest de la aplicación Bibliotech para la gestión de libros.")
                        .contact(new Contact()
                                .name("Grupo Biliotech")
                                .email("bibliotech.c15@gmail.com")
                        )
                );
    }

//    @Bean
//    public void message(){
//        System.out.println("bearer is working");
//    }
}
