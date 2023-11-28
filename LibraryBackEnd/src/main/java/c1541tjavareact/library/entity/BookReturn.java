package c1541tjavareact.library.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "returns")
@NoArgsConstructor
@AllArgsConstructor
public class BookReturn implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_return")
    private Long idReturn;

    @Column(nullable = false)
    private Boolean status; // TODO en false

    @Column(name = "return_expected_date",nullable = false)
    private LocalDate returnExpectedDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @OneToOne
    @JoinColumn(name = "id_loan", nullable = false,
        referencedColumnName = "id_loan")
    private Loan loan;

    @OneToOne(mappedBy = "bookReturn")
    private Pending pending;
    //TODO ver relacion 1 a 1


}
