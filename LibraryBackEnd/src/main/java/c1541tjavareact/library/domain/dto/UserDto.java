package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static c1541tjavareact.library.domain.util.constant.Constants.*;

@Getter
@Setter
public class UserDto {

    private Long idUser;

    @NotBlank
    @Pattern(regexp = "^(?:\\d{7}|\\d{8}|\\d{10})$",
            message = INVALID_DNI)
    private String dni;

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
    @Pattern(regexp = "^\\d{10}$",
            message = INVALID_PHONE_NUMBER)
    private String phoneNumber;

    @NotBlank
    private String address;

    private List<LoanDto> loansDto;

    private boolean isActive = true;

}
