package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AdminDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;


public interface AdminCrudRepository {
    UserDetails findByUserName(String userName);
    AdminDto save(AdminDto adminDto);
    Optional<AdminDto> getAdminDto(Long idAdmin);
    AdminDto update(Long idAdmin, AdminDto adminDto);
    void delete(Long idAdmin);

}
