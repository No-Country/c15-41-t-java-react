package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public record ResponseBookDto (
        String title,

        String isbn) {
}
