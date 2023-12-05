package c1541tjavareact.library.domain.service;


import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.repository.UserCrudRepository;
import c1541tjavareact.library.persistence.crud.UserCrudRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserCrudRepository userCrudRepository;

//    @Autowired
    public UserService(UserCrudRepositoryImpl userCrudRepository) {
        this.userCrudRepository = userCrudRepository;
    }

    public List<UserDto> getAll() {
        return userCrudRepository.getAll();
    }

    public UserDto save(UserDto userDto) {
        return userCrudRepository.save(userDto);
    }

    public Optional<UserDto> getUserDto(Long idUser) {
        return userCrudRepository.getUserDto(idUser);
    }

    public UserDto update(Long idAuthor, UserDto userDto) {
        return userCrudRepository.update(idAuthor,userDto);
    }

    public void delete(Long idUser) {
        userCrudRepository.delete(idUser);
    }



//    @Transactional(readOnly = true)
//    public UserDto searchUserByDNI(String dni) {
//
//        User user = userCrudRepository.findByDni(dni);
//
//        return userDAOMapper.toUserDTO(user);
//
//    }

}
