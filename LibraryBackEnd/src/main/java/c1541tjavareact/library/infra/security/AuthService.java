package c1541tjavareact.library.infra.security;

import c1541tjavareact.library.domain.service.AdminService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author jdmon on 11/12/2023
 * @project LibraryBackEnd
 */
@Service
public class AuthService implements UserDetailsService {

    private final AdminService adminService;

    public AuthService(AdminService adminService) {
        this.adminService = adminService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adminService.findByUserName(username);
    }
}
