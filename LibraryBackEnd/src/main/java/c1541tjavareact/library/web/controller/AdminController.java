package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.AdminDto;
import c1541tjavareact.library.domain.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/save")
    public ResponseEntity<AdminDto> save(@RequestBody @Valid AdminDto adminDto) {
        String passEncoded = passwordEncoder.encode(adminDto.getPassword());
        adminDto.setPassword(passEncoded);
        return ResponseEntity.ok(adminService.save(adminDto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdminDto> getAdminDto(@PathVariable Long id){
        return adminService.getAdminDto(id).map(
                        ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AdminDto> update(@PathVariable Long id,
                                           @RequestBody AdminDto adminDto){
        return ResponseEntity.ok(adminService.update(id,adminDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(adminService.getAdminDto(id).isPresent()){
            adminService.delete(id);
            return ResponseEntity.noContent().build();
        }else return ResponseEntity.notFound().build();
    }
}
