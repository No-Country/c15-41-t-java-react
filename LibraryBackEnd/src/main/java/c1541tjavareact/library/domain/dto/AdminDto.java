package c1541tjavareact.library.domain.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminDto {

    private Long idAdmin;

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
    @Pattern(regexp = "^(?=.*[A-Z]).{8,}$",
            message = "The field must have a minimum of 8 characters" +
                    " and at least one uppercase letter")
    private String password;
}
