package c1541tjavareact.library.web.controller;


import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.service.EditorialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/editorials")
public class EditorialController {

    @Autowired
    private EditorialService editorialService;

    @GetMapping("/all")
    public ResponseEntity<List<EditorialDto>> getAll (){
        return ResponseEntity.ok(editorialService.getAll());
    }

    @PostMapping("/save")
    public ResponseEntity<EditorialDto> save(@RequestBody @Valid EditorialDto editorialDto) {
        return ResponseEntity.ok(editorialService.save(editorialDto));

    }

    @GetMapping("/{id}")
    public ResponseEntity<EditorialDto> getBook(@PathVariable Long id) {
        return editorialService.getEditorialDto(id).map(
                        ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EditorialDto> update(@PathVariable Long id,
                                            @RequestBody EditorialDto editorialDto){
        return ResponseEntity.ok(editorialService.update(id,editorialDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(editorialService.getEditorialDto(id).isPresent()){
            editorialService.delete(id);
            return ResponseEntity.noContent().build();
        }else return ResponseEntity.notFound().build();
    }

}
