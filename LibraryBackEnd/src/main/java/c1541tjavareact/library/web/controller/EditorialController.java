package c1541tjavareact.library.web.controller;


import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.service.EditorialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/editorials")
public class EditorialController {

    @Autowired
    private EditorialService editorialService;


    @PostMapping("/save")
    public ResponseEntity<EditorialDto> save(@RequestBody @Valid EditorialDto editorialDto) {
        return ResponseEntity.ok(editorialService.save(editorialDto));

    }

}
