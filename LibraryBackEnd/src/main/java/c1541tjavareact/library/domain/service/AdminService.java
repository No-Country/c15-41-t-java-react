package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.domain.repository.AdminCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminCrudRepository adminCrudRepository;
    public AdminDto save(AdminDto adminDto) {
        //TODO adminDto.setPassword(); settear password codificada
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

}
