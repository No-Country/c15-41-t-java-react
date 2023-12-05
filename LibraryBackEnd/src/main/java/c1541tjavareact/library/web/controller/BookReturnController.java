package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.domain.service.BookReturnService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/returns")
public class BookReturnController {

    @Autowired
    private BookReturnService bookReturnService;


    @PostMapping("/save")
    public ResponseEntity<BookReturnDto> save(@RequestBody @Valid BookReturnDto bookReturnDto) {
        return ResponseEntity.ok(bookReturnService.save(bookReturnDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReturnDto> getBookReturn(@PathVariable("id") Long idBookReturn) {
        return bookReturnService.getBookReturn(idBookReturn)
                .map(bookReturnDto -> new ResponseEntity<>(bookReturnDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
