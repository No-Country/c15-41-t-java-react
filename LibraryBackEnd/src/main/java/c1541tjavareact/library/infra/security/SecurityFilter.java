package c1541tjavareact.library.infra.security;

import c1541tjavareact.library.domain.service.AdminService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * @author jdmon on 5/12/2023
 * @project challenge-one-foro-alura
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    private final AdminService adminService;
    public SecurityFilter(TokenService tokenService, AdminService adminService) {
        this.tokenService = tokenService;
        this.adminService = adminService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        var authHeader = request.getHeader("Authorization");
        if(authHeader != null){
            var token = authHeader.replace("Bearer ","");
            var userName=tokenService.getSubject(token);
            if (userName!=null){
                var admin=adminService.findByUserName(userName);
                var authentication= new UsernamePasswordAuthenticationToken(
                        admin,null,
                        admin.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request,response);
    }
}
