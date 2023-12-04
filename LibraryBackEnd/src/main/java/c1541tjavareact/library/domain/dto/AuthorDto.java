package c1541tjavareact.library.domain.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorDto {

    private Long idAuthor;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z ]{3,}$")
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z ]{3,}$")
    private String lastName;
}
