package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.UserDTO;
import c1541tjavareact.library.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usr")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> listAllUsers() {

        return userService.listUsers();

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO findCustomer(@PathVariable String dni) {

        return userService.searchUserByDNI(dni);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Validated @RequestBody UserDTO userDTO) {

        userService.createUSer(userDTO);

    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(@Validated @RequestBody UserDTO userDTO) {

        userService.updateUSer(userDTO);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String dni) {

        userService.deleteUser(dni);

    }

}
