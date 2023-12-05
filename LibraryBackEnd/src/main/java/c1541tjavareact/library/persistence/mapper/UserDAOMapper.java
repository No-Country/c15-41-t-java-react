package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.UserDTO;
import c1541tjavareact.library.persistence.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface UserDAOMapper {

    @Mapping(source = "loans", target = "loans")
    UserDTO toUserDTO(User user);

    List<UserDTO> toUsersDTO(List<User> users);

    @InheritInverseConfiguration
    @Mapping(target = "loans", ignore = true)
    User toUser(UserDTO userDTO);

}
