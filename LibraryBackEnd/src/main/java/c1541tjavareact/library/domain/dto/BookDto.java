package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {

    private Long idBook;

    @NotBlank
    private String title;

    @NotNull
    private Long idAuthor;

    @NotNull
    private Long idEditorial;

    @NotBlank
    private String isbn;

    @NotNull
    private Genre genre;

    @NotNull
    private Integer quantity;

    private EditorialDto editorialDto;

    private AuthorDto authorDto;

}
