package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.ResponseBookDto;
import c1541tjavareact.library.domain.service.AuthorService;
import c1541tjavareact.library.domain.service.BookService;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@RestController
@RequestMapping("/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/save")
    public ResponseEntity<AuthorDto> save(@RequestBody @Valid AuthorDto authorDto) {
        return ResponseEntity.ok(authorService.save(authorDto));
    }
}
