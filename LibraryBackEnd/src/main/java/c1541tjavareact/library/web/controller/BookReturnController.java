package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.domain.service.BookReturnService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/returns")
public class BookReturnController {

    @Autowired
    private BookReturnService bookReturnService;

    @GetMapping("/all")
    public ResponseEntity<List<BookReturnDto>> getAll() {
        return ResponseEntity.ok(bookReturnService.getAll());
    }


//    @PostMapping("/save")
//    public ResponseEntity<BookReturnDto> save(@RequestBody @Valid BookReturnDto bookReturnDto) {
//        return ResponseEntity.ok(bookReturnService.save(bookReturnDto));
//    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReturnDto> getBookReturn(@PathVariable("id") Long idBookReturn) {
        return bookReturnService.getBookReturn(idBookReturn)
                .map(bookReturnDto -> new ResponseEntity<>(bookReturnDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookReturnDto> update(@PathVariable("id") Long idBookReturn, @RequestBody BookReturnDto bookReturnDto) {
        BookReturnDto bookReturnUpdated = bookReturnService.update(idBookReturn, bookReturnDto);
        if(bookReturnUpdated!=null){
            return ResponseEntity.ok(bookReturnUpdated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BookReturnDto> delete(@PathVariable("id") Long idBookReturn) {
        if(bookReturnService.delete(idBookReturn)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
