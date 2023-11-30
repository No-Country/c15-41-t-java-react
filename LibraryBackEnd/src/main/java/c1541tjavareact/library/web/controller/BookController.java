package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.ResponseBookDto;
import c1541tjavareact.library.domain.service.BookService;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.mapper.AuthorDaoMapper;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import c1541tjavareact.library.persistence.mapper.ResponseBookMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private AuthorDaoMapper authorDaoMapper;

    @Autowired
    private BookDaoMapper bookDaoMapper;
//
//    @Autowired
//    private ResponseBookMapper responseBookMapper;

//    @GetMapping
//    public ResponseEntity<Page<>>
    @PostMapping("/save")
    public ResponseEntity<BookDto> save(@RequestBody @Valid BookDto bookDto) {
        AuthorDto authorDto =bookService.getAuthor(bookDto.getId_author());
        Editorial editorial =bookService.getEditorial(bookDto.getId_editorial());
        Book book = bookDaoMapper.toBook(bookDto);
        book.setAuthor(authorDaoMapper.toAuthor(authorDto));
        book.setLinkedEditorials(List.of(editorial));
        bookService.save(book);
        return ResponseEntity.ok(bookDto);
    }
}
