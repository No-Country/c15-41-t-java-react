package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.persistence.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface UserDaoMapper {

    @Mapping(source = "loans", target = "loansDto")
    UserDto toUserDTO(User user);

    List<UserDto> toUsersDTO(List<User> users);

    @InheritInverseConfiguration
    User toUser(UserDto userDTO);

}
