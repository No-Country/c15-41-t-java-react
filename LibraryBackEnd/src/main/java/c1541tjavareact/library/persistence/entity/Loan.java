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

    @Column(name = "return_effective_date")
    private LocalDate returnEffectiveDate;

    @Column(name = "id_book", nullable = false)
    private Long idBook;

    @Column(name = "id_admin", nullable = false)
    private Long idAdmin;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_book",nullable = false,
                insertable = false, updatable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_admin",nullable = false,
                insertable = false, updatable = false)
    private Admin admin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user",nullable = false,
                insertable = false, updatable = false)
    private User user;

    @OneToOne(mappedBy = "loan")
    private Pending pending;

}
