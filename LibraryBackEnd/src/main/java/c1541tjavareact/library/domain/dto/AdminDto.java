package c1541tjavareact.library.domain.dto;

import static c1541tjavareact.library.domain.util.constant.Constants.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
public class AdminDto {

    private Long idAdmin;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = INVALID_CHARACTERS)
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = INVALID_CHARACTERS)
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+" +
            "@[a-zA-Z0-9.-]+" +
            ".(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$",
        message = INVALID_EMAIL)
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9.!@#$&*%_\\-=]+$",
            message = INVALID_PASSWORD)
    @Length(min = 8)
    private String password;
}
