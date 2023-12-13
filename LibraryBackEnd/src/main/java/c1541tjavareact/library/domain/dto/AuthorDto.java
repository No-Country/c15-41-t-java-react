package c1541tjavareact.library.domain.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import static c1541tjavareact.library.domain.util.constant.Constants.INVALID_CHARACTERS;

@Getter
@Setter
public class AuthorDto {

    private Long idAuthor;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = INVALID_CHARACTERS)
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = INVALID_CHARACTERS)
    private String lastName;
}
