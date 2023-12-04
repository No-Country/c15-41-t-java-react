package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.exceptions.BiblioTechExceptions;
import c1541tjavareact.library.domain.repository.UserRepository;
import c1541tjavareact.library.persistence.entity.Login;
import c1541tjavareact.library.persistence.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {

        return userRepository.findAll();

    }

    public User findByID(Long dni) throws BiblioTechExceptions {

        Optional<User> answer = userRepository.findById(dni);

        if (answer.isPresent()) {

            return answer.get();

        } else {

            throw new BiblioTechExceptions("User not found.");


        }

    }

    public List<User> findByString(String searchBy, String searchParam) throws BiblioTechExceptions {

        List<User> found = new ArrayList<>();
        User user;

        switch(searchBy) {
            case "name":
                found = userRepository.searchByName(searchParam);
                break;
            case "lastname":
                found = userRepository.searchByLastname(searchParam);
                break;
            case "phoneNumber":
                user = userRepository.searchByPhoneNumber(searchParam);
                found.add(user);
                break;
            case "email":
                user = userRepository.searchByEmail(searchParam);
                found.add(user);
                break;
            case "address":
                user = userRepository.searchByAddress(searchParam);
                found.add(user);
                break;
        }

        if (!found.isEmpty()) {

            return found;

        } else {

            throw new BiblioTechExceptions("User not found.");

        }

    }

    @Transactional
    public void deleteUser(Long dni) throws BiblioTechExceptions {

        User user = findByID(dni);

        user.setActive(false);

        userRepository.save(user);

    }

    @Transactional
    public void createUser(Long dni, String name, String lastName, String phoneNumber, Login login, String address) throws BiblioTechExceptions {

        validate((long) 0, name, lastName, phoneNumber, address);

        User user = new User(dni, name, lastName, phoneNumber, address);

        userRepository.save(user);

    }

    @Transactional
    public void updateUser(Long dni, String name, String lastName, String phoneNumber, String address) throws BiblioTechExceptions {

        validate(dni, name, lastName, phoneNumber, address);

        User user = findByID(dni);

        user.setName(name);

        user.setLastName(lastName);

        user.setPhoneNumber(phoneNumber);

        user.setAddress(address);

    }

    private void validate(Long dni, String name, String lastName, String phoneNumber, String address) throws BiblioTechExceptions {

        if (dni == null) {

            throw new BiblioTechExceptions("An id is required.");

        }

        if ((lastName == null) || (lastName.isEmpty())) {

            throw new BiblioTechExceptions("A lastName is required.");

        }

        if ((phoneNumber == null) || (phoneNumber.isEmpty())) {

            throw new BiblioTechExceptions("A phoneNumber is required.");

        }

        if ((address == null) || (address.isEmpty())) {

            throw new BiblioTechExceptions("An address is required.");

        }

    }

}
