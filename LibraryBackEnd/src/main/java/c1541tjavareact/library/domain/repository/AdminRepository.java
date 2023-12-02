package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AdminRepository extends JpaRepository<Admin,Long> {
}
