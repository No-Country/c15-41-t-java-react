package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

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

    @Column(name = "loan_date",nullable = false)
    private LocalDate loanDate;

    @Column(name = "return_expected_date", nullable = false)
    private LocalDate returnExpectedDate;

    @Column(name = "id_book")
    private Long idBook;

    @Column(name = "id_admin")
    private Long idAdmin;

    @Column(name = "id_user")
    private Long idUser;

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

    @OneToOne(mappedBy = "loan")
    private BookReturn bookReturn;


}
