package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.service.AuthorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/all")
    public ResponseEntity<List<AuthorDto>> getAll (){
        return ResponseEntity.ok(authorService.getAll());
    }

    @PostMapping("/save")
    public ResponseEntity<AuthorDto> save(@RequestBody @Valid AuthorDto authorDto) {
        return ResponseEntity.ok(authorService.save(authorDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> getBook(@PathVariable Long id) {
        return authorService.getAuthorDto(id).map(
                ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuthorDto> update(@PathVariable Long id,
                                           @RequestBody AuthorDto authorDto){
        return ResponseEntity.ok(authorService.update(id,authorDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(authorService.getAuthorDto(id).isPresent()){
            authorService.delete(id);
            return ResponseEntity.noContent().build();
        }else return ResponseEntity.notFound().build();
    }
}
