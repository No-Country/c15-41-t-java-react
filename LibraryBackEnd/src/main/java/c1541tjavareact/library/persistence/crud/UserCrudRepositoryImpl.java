package c1541tjavareact.library.persistence.crud;


import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.repository.UserCrudRepository;
import c1541tjavareact.library.domain.repository.UserRepository;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.User;
import c1541tjavareact.library.persistence.mapper.UserDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserCrudRepositoryImpl implements UserCrudRepository {

    private final UserRepository userRepository;
    private final UserDaoMapper userDaoMapper;

//    @Autowired
    public UserCrudRepositoryImpl(UserRepository userRepository, UserDaoMapper userDaoMapper) {
        this.userRepository = userRepository;
        this.userDaoMapper = userDaoMapper;
    }


    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        users = users.stream().filter(User::isActive).toList();
        return userDaoMapper.toUsersDTO(users);
    }

    @Override
    public UserDto save(UserDto userDto) {
        User user = userDaoMapper.toUser(userDto);
        return userDaoMapper.toUserDTO(userRepository.save(user));
    }

    @Override
    public Optional<UserDto> getUserDto(Long idUser) {
        return userRepository.findById(idUser)
                .map(userDaoMapper::toUserDTO);
    }

    @Override
    public UserDto update(Long idUser, UserDto userDto) {
        return getUserDto(idUser).map(userDtoUpdate -> {
            userDtoUpdate.setDni(userDto.getDni());
            userDtoUpdate.setName(userDto.getName());
            userDtoUpdate.setLastName(userDto.getLastName());
            userDtoUpdate.setEmail(userDto.getEmail());
            userDtoUpdate.setPhoneNumber(userDto.getPhoneNumber());
            userDtoUpdate.setAddress(userDto.getAddress());
            return save(userDtoUpdate);
        }).orElseThrow(() -> new BibliotechException("No se pudo actualizar el usuario"));
    }


    @Override
    public void delete(Long idUser) {
        getUserDto(idUser).map(userDto -> {
            userDto.setActive(false);
            return save(userDto);
        });

    }
}
