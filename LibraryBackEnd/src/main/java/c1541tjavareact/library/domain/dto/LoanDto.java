package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.Admin;
import c1541tjavareact.library.persistence.entity.BookReturn;
import c1541tjavareact.library.persistence.entity.User;
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
    private BookDto bookDto;

    @NotNull
    private LocalDate loanDate;

    @NotNull
    private LocalDate returnExpectedDate;

    //TODO

//    @NotNull
//    private AdminDto admin; //TODO

//    @NotNull
//    private UserDto user; //TODO



//    private BookReturnDto bookReturn; //TODO

}
