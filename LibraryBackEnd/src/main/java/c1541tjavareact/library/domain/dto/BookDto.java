package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {

    private Long idBook;

    @NotBlank
    @Pattern(regexp = "[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ ]{3,50}",
            message = "The field contains invalid characters")
    private String title;

    @NotNull
    private Long idAuthor;

    @NotNull
    private Long idEditorial;

    @NotBlank
    @Pattern(regexp = "^(?:-1[03])?:?(?=[0-9X]{10}$" +
            "|(?=(?:[0-9]+-){3})[-0-9X]{13}$" +
            "|97[89][0-9]{10}$" +
            "|(?=(?:[0-9]+-){4})[-0-9]{17}$)" +
            "(?:97[89]-)?[0-9]{1,5}-[0-9]+-[0-9]+-[0-9X]$",
            message = "Isbn is not valid")
    private String isbn;

    @NotNull
    private Genre genre;

    @NotNull
    @Min(value = 1, message = "The quantity must be greater than 0")
    @Max(value = 999, message = "The quantity must be less than 999")
    private Integer quantity;

    private EditorialDto editorialDto;

    private AuthorDto authorDto;

}
