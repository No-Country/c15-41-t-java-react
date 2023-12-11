package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.service.BookService;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<BookDto>> getAll() {
        return ResponseEntity.ok(bookService.getAll());
    }

    @GetMapping("/genres")
    public ResponseEntity<List<String>> getBookGenres() {
        return ResponseEntity.ok(bookService.getBookGenres());
    }

    @PostMapping("/save")
    public ResponseEntity<BookDto> save(@RequestBody @Valid BookDto bookDto) {
        return new ResponseEntity<>(bookService.save(bookDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable("id") Long idBook) {
        return bookService.getBook(idBook)
                .map(BookDto -> new ResponseEntity<>(BookDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/search") //TODO genre
    public ResponseEntity<List<BookDto>> searchBooksBytitleGenreAuthor(@RequestParam(required = false) String fields) {
        List<BookDto> books = bookService.searchBooksBytitleGenreAuthor(fields);
        if(!books.isEmpty()){
            return ResponseEntity.ok(books);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long idBook, @RequestBody BookDto bookDto){
        BookDto bookUpdated = bookService.update(idBook, bookDto);
        if(bookUpdated!=null){
            return ResponseEntity.ok(bookUpdated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BookDto> deleteBook(@PathVariable("id") Long idBook){
        if(bookService.delete(idBook)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
