package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.repository.UserRepository;
import c1541tjavareact.library.persistence.entity.User;
import c1541tjavareact.library.persistence.mapper.UserDAOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserCrudRepositoryImpl {

    UserRepository userRepository;
    UserDAOMapper userDAOMapper;

    @Autowired
    public UserCrudRepositoryImpl(UserRepository userRepository, UserDAOMapper userDAOMapper) {
        this.userRepository = userRepository;
        this.userDAOMapper = userDAOMapper;
    }

    public Optional findByID(Long userId) {

        Optional<User> answer = userRepository.findById(userId);

        return answer;

    }

    public User findByDni(String dni) {
        return userRepository.findByDni(dni);
    }

    public List<User> findByName(String searchParam) {
        return userRepository.findByName(searchParam);
    }

    public List<User> findByLastname(String searchParam) {
        return userRepository.findByLastName(searchParam);
    }

    public User findByPhoneNumber(String searchParam) {
        return userRepository.findByPhoneNumber(searchParam);
    }

    public User findByEmail(String searchParam) {
        return userRepository.findByEmail(searchParam);
    }

    public User findByAddress(String searchParam) {
        return userRepository.findByAddress(searchParam);
    }

    public List<User> findAll() {
        return findAll();
    }

    public void save(User user) {

        save(user);

    }

    public void update(User updatedUser) {

        User user = userRepository.findByDni(updatedUser.getDni());

        if (user != null){

            save(updatedUser);

        }

    }

    public void delete(String dni) {

        User user = userRepository.findByDni(dni);

        if (user != null){

            user.setActive(false);

            save(user);

        }

    }

}
