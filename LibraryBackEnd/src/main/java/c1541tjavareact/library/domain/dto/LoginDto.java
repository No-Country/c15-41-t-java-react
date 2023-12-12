package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import static c1541tjavareact.library.domain.util.constant.Constants.*;

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
            message = INVALID_EMAIL)
    private String userName;

    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9.!@#$&*%_\\-=]+$",
            message = INVALID_PASSWORD)
    @Length(min = 8)
    private String password;
}
