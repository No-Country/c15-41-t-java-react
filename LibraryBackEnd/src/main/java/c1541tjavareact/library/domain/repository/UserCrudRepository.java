package c1541tjavareact.library.domain.repository;


import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserCrudRepository  {

    List<UserDto> getAll();
    UserDto save(UserDto userDto);
    Optional<UserDto> getUserDto(Long idUser);
    UserDto update(Long idUser, UserDto userDto);
    void delete(Long idUser);


}
