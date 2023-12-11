package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

/**
 * @author jdmon on 10/12/2023
 * @project LibraryBackEnd
 */
@Getter
@Setter
public class LoginDto {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+" +
            "@[a-zA-Z0-9.-]+" +
            ".(com|co|es|it|net|org|gov|edu|mil|io|xyz|info|biz|mx|ar)$",
            message = "Email is not valid")
    private String userName;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9.!@#$&*%_\\-=]+$",
            message = "The field must have a minimum of 8 characters," +
                    " at least one uppercase letter," +
                    " and only some special characters are allowed")
    @Length(min = 8)
    private String password;
}
