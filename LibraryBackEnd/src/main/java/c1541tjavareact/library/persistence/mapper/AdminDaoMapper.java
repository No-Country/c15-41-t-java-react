package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.persistence.entity.Admin;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Mapper (componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdminDaoMapper {
    AdminDto toAdminDto (Admin admin);
    List<AdminDto> toAdminsDto(List<Admin> admins);
    @InheritInverseConfiguration
    @Mapping(target = "loans" , ignore = true)
    Admin toAdmin (AdminDto adminDto);

}
