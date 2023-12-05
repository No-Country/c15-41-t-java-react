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
    private LocalDate returnExpectedDate;

    @NotNull
    private Long idBook;

    @NotNull
    private Long idAdmin;

    @NotNull
    private Long idUser;

    @NotNull
    private BookDto bookDto;

//    @NotNull
//    private AdminDto admin; //TODO

//    @NotNull
//    private UserDto user; //TODO



//    private BookReturnDto bookReturn; //TODO

}
