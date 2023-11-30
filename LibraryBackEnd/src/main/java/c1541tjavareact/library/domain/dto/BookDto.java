package c1541tjavareact.library.domain.dto;


import c1541tjavareact.library.persistence.entity.enums.Genre;

import java.util.List;


/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public record BookDto(Long idBook,

        String title,

        String isbn,

        Genre genre,

        Integer quantity,

        Long id_author,
        Long id_editorial ) {
//    private Long idBook;
//
//    private String title;
//
//    private String isbn;
//
//    private Genre genre;
//
//    private Integer quantity;
//
//    private Long id_author;
}
