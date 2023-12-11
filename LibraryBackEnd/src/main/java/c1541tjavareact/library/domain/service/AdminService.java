package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.domain.repository.AdminCrudRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminCrudRepository adminCrudRepository;

    public AdminService(AdminCrudRepository adminCrudRepository) {
        this.adminCrudRepository = adminCrudRepository;
    }

    public AdminDto save(AdminDto adminDto) {
        return adminCrudRepository.save(adminDto);
    }
    public Optional<AdminDto> getAdminDto(Long idAdmin){
        return adminCrudRepository.getAdminDto(idAdmin);
    }

    public AdminDto update(Long idAdmin, AdminDto adminDto){
        return adminCrudRepository.update(idAdmin,adminDto);
    }

    public void delete(Long idAdmin){
        adminCrudRepository.delete(idAdmin);
    }

    public UserDetails findByUserName(String userName){
        return adminCrudRepository.findByUserName(userName);
    }

}
