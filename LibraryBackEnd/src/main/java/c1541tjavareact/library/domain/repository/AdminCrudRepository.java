package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AdminDto;

import java.util.Optional;


public interface AdminCrudRepository {
    AdminDto save(AdminDto adminDto);
    Optional<AdminDto> getAdminDto(Long idAdmin);
    AdminDto update(Long idAdmin, AdminDto adminDto);
    void delete(Long idAdmin);


    //TODO Update
}
