package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;
    @PostMapping("/save")
    public ResponseEntity<BookDto> save(@RequestBody @Valid BookDto bookDto) {
        return ResponseEntity.ok(bookService.save(bookDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable("id") Long idBook) {
        return bookService.getBook(idBook)
                .map(BookDto -> new ResponseEntity<>(BookDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
