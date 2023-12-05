package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.UserDTO;
import c1541tjavareact.library.persistence.crud.UserCrudRepositoryImpl;
import c1541tjavareact.library.persistence.entity.User;
import c1541tjavareact.library.persistence.mapper.UserDAOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    UserCrudRepositoryImpl userCrudRepository;
    UserDAOMapper userDAOMapper;

    @Autowired
    public UserService(UserCrudRepositoryImpl userCrudRepository, UserDAOMapper userDAOMapper) {
        this.userCrudRepository = userCrudRepository;
        this.userDAOMapper = userDAOMapper;
    }

    @Transactional
    public void createUSer(UserDTO userDTO) {

        User user = userDAOMapper.toUser(userDTO);

        userCrudRepository.save(user);

    }

    @Transactional
    public void updateUSer(UserDTO userDTO) {

        User user = userDAOMapper.toUser(userDTO);

        userCrudRepository.update(user);

    }

    @Transactional
    public void deleteUser(String dni) {

        userCrudRepository.delete(dni);

    }

    @Transactional(readOnly = true)
    public List<UserDTO> listUsers() {

        return userCrudRepository.findAll().stream()
                .map(userDAOMapper::toUserDTO)
                .collect(Collectors.toList());

    }

    @Transactional(readOnly = true)
    public UserDTO searchUserByDNI(String dni) {

        User user = userCrudRepository.findByDni(dni);

        return userDAOMapper.toUserDTO(user);

    }

}
