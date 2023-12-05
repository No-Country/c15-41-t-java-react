package c1541tjavareact.library.web.controller;


import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/users")
public class UserController {

    private final UserService userService;
//    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll (){
        return ResponseEntity.ok(userService.getAll());
    }

    @PostMapping("/save")
    public ResponseEntity<UserDto> save(@RequestBody @Valid UserDto userDto) {
        return ResponseEntity.ok(userService.save(userDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return userService.getUserDto(id).map(
                        ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id,
                                            @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.update(id,userDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(userService.getUserDto(id).isPresent()){
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }else return ResponseEntity.notFound().build();
    }

//    @GetMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public UserDto findCustomer(@PathVariable String dni) {
//
//        return userService.searchUserByDNI(dni);
//
//    }


}
