package c1541tjavareact.library.infra.security;

import c1541tjavareact.library.persistence.entity.Admin;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * @author jdmon on 5/12/2023
 * @project challenge-one-foro-alura
 */
@Service
public class TokenService {
    @Value("${api.security.secret}")
    private String apiSecret;

    public String generateToken(Admin admin) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("bibliotech")
                    .withSubject(admin.getUsername())
                    .withClaim("id_admin",admin.getIdAdmin())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        }catch (JWTCreationException exception){
            throw new RuntimeException("Generate token fail");
        }
    }

    public String getSubject (String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.require(algorithm)
                    .withIssuer("bibliotech")
                    .build()
                    .verify(token).getSubject();
        }catch (JWTVerificationException exception){
            throw new RuntimeException("");
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
    }
}
