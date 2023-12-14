package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.GenreDto;
import c1541tjavareact.library.domain.service.GenreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books/genres")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping("/all")
    public ResponseEntity<List<GenreDto>> getAll(){
        return ResponseEntity.ok(genreService.getAll());
    }

    @PostMapping("/save")
    public ResponseEntity<GenreDto> save(@RequestBody @Valid GenreDto genreDto) {
        return ResponseEntity.ok(genreService.save(genreDto));

    }

    @GetMapping("/{id}")
    public ResponseEntity<GenreDto> getGenre(@PathVariable Long id) {
        return genreService.getGenreDto(id).map(
                        ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GenreDto> update(@PathVariable Long id,
                                            @RequestBody GenreDto genreDto){
        return ResponseEntity.ok(genreService.update(id,genreDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(genreService.getGenreDto(id).isPresent()){
            genreService.delete(id);
            return ResponseEntity.noContent().build();
        }else return ResponseEntity.notFound().build();
    }

}
