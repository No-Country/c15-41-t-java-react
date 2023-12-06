package c1541tjavareact.library.persistence.crud;


import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.repository.UserCrudRepository;
import c1541tjavareact.library.domain.repository.UserRepository;
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

//    public Optional findByID(Long userId) {
//
//        Optional<User> answer = userRepository.findById(userId);
//
//        return answer;
//
//    }

//    public User findByDni(String dni) {
//        return userRepository.findByDni(dni);
//    }
//
//    public List<User> findByName(String searchParam) {
//        return userRepository.findByName(searchParam);
//    }
//
//    public List<User> findByLastname(String searchParam) {
//        return userRepository.findByLastName(searchParam);
//    }
//
//    public User findByPhoneNumber(String searchParam) {
//        return userRepository.findByPhoneNumber(searchParam);
//    }
//
//    public User findByEmail(String searchParam) {
//        return userRepository.findByEmail(searchParam);
//    }
//
//    public User findByAddress(String searchParam) {
//        return userRepository.findByAddress(searchParam);
//    }

    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        users = users.stream().filter(u -> u.isActive()).toList();
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
        }).orElse(null);
    }


    @Override
    public void delete(Long idUser) {
        getUserDto(idUser).map(userDto -> {
            userDto.setActive(false);
            return save(userDto);
        });

    }
}
