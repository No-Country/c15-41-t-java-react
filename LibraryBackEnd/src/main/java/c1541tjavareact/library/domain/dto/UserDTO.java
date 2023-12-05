package c1541tjavareact.library.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
@Component
public class UserDTO {

    private Long idUser;

    private String dni;

    private String name;

    private String lastName;

    private String phoneNumber;

    private String address;

    private List<Loan> loans;

}
