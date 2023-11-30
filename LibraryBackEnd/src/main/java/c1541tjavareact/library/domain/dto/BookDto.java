package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.BookEditorial;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private Long idBook;

    private String title;

    private String isbn;

    private Genre genre;

    private Integer quantity;

    private Integer id_author_2;

    private List<BookEditorial> editorialList;

    private Author author;
}
