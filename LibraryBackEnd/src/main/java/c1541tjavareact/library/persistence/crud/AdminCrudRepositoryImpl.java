package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.domain.repository.AdminCrudRepository;
import c1541tjavareact.library.domain.repository.AdminRepository;
import c1541tjavareact.library.persistence.entity.Admin;
import c1541tjavareact.library.persistence.mapper.AdminDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class AdminCrudRepositoryImpl implements AdminCrudRepository {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminDaoMapper adminDaoMapper;
    @Override
    public UserDetails findByUserName(String userName) {
        return adminRepository.findByEmail(userName);
    }

    @Override
    public AdminDto save(AdminDto adminDto) {
        Admin admin = adminDaoMapper.toAdmin(adminDto);
        return adminDaoMapper.toAdminDto(adminRepository.save(admin));

    }
    @Override
    public void delete(Long idAdmin) {
        adminRepository.deleteById(idAdmin);
    }

    @Override
    public Optional<AdminDto> getAdminDto(Long idAdmin) {
        return adminRepository.findById(idAdmin)
                .map(admin -> adminDaoMapper.toAdminDto(admin));
    }

    @Override
    public AdminDto update(Long idAdmin, AdminDto adminDto) {
        return getAdminDto(idAdmin).map(adminDtoUpdate -> {
            adminDtoUpdate.setName(adminDto.getName());
            adminDtoUpdate.setLastName(adminDto.getLastName());
            adminDtoUpdate.setPassword(adminDto.getPassword());
            adminDtoUpdate.setEmail(adminDto.getEmail());
            return save(adminDtoUpdate);
            }).orElse(null);
    }

}
