package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.AuthDto;
import c1541tjavareact.library.domain.dto.LoginDto;
import c1541tjavareact.library.infra.security.TokenService;
import c1541tjavareact.library.persistence.entity.Admin;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jdmon on 10/12/2023
 * @project LibraryBackEnd
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }
    @PostMapping("/login")
    public ResponseEntity<Object> authenticateUser(
            @RequestBody @Valid LoginDto loginDto){
        Authentication authToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUserName(),
                loginDto.getPassword()
        );
        try{
            var adminAuthenticated = authenticationManager.authenticate(authToken);
            var jwtToken = tokenService.generateToken((Admin) adminAuthenticated.getPrincipal());
            Long idAdmin = ((Admin) adminAuthenticated.getPrincipal()).getIdAdmin();
            String name = ((Admin) adminAuthenticated.getPrincipal()).getName();
            return ResponseEntity.ok(new AuthDto(jwtToken,idAdmin,name));
        } catch (RuntimeException ignore){
            Map<String,String> responseError = new HashMap<>();
            responseError.put("message","Credenciales invalidas");
            return ResponseEntity.badRequest().body(responseError);
        }

    }
}
