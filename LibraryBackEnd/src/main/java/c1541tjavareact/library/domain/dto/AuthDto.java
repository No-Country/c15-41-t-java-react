package c1541tjavareact.library.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author jdmon on 10/12/2023
 * @project LibraryBackEnd
 */
@Getter
@Setter
@AllArgsConstructor
public class AuthDto {
    String jwtToken;
    Long idAdmin;
    String name;
}
