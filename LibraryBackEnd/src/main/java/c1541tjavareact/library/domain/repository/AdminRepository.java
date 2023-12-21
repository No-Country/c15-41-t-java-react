package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;


public interface AdminRepository extends JpaRepository<Admin,Long> {
    UserDetails findByEmail(String userName);
}
