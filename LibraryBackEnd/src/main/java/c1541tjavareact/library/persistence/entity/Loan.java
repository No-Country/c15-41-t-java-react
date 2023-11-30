package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * @author jdmon on 27/11/2023
 * @project LibraryBackEnd
 */
@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loan implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_loan")
    private Long idLoan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_book",nullable = false,
    referencedColumnName = "id_book")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_admin",nullable = false,
    referencedColumnName = "id_admin")
    private Admin admin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user",nullable = false,
    referencedColumnName = "id_user")
    private User user;

    @Column(name = "loan_date",nullable = false)
    private LocalDate loanDate;

    @Column(name = "return_expected_date", nullable = false)
    private LocalDate returnExpectedDate;

    @OneToOne(mappedBy = "loan")
    private BookReturn bookReturn;
    //TODO ver relacion 1 a 1


}
