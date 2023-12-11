package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {

    private Long idUser;

    @NotBlank
    @Pattern(regexp = "^(?:\\d{7}|\\d{8}|\\d{10})$",
            message = "Dni is not valid")
    private String dni;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = "The field contains invalid characters")
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = "The field contains invalid characters")
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+" +
            "@[a-zA-Z0-9.-]+" +
            ".(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$",
            message = "Email is not valid")
    private String email;

    @NotBlank
    @Pattern(regexp = "^\\d{10}$",
            message = "PhoneNumber is not valid")
    private String phoneNumber;

    @NotBlank
    private String address;

    private List<LoanDto> loansDto;

    private boolean isActive = true;

}
