package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.domain.repository.AdminCrudRepository;
import c1541tjavareact.library.domain.repository.AdminRepository;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Admin;
import c1541tjavareact.library.persistence.mapper.AdminDaoMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
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
    public List<AdminDto> getAll() {
        return adminDaoMapper.toAdminsDto(adminRepository.findAll());
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
            if(StringUtils.isNotEmpty(adminDto.getPassword())) {
                adminDtoUpdate.setPassword(adminDto.getPassword());
            }
            adminDtoUpdate.setEmail(adminDto.getEmail());
            return save(adminDtoUpdate);
            }).orElseThrow(() -> new BibliotechException("No se pudo actualizar el admin"));
    }

}
