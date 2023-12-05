package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.Admin;
import c1541tjavareact.library.persistence.entity.BookReturn;
import c1541tjavareact.library.persistence.entity.User;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LoanDto {

    private Long idLoan;

    @NotNull
    private LocalDate loanDate;

    @NotNull
    private LocalDate returnExpectedDate;//o de default asigno entro un mes en el LoanCrudRepositoryImpl? TODO

    @NotNull
    private Long idBook;

    @NotNull
    private Long idAdmin;

    @NotNull
    private Long idUser;

    private BookDto bookDto;

//    private AdminDto adminDto; //TODO

//    private UserDto userDto; //TODO

//    private BookReturnDto bookReturnDto; //TODO

}
