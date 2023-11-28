package c1541tjavareact.library.persistence.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "return")
public class BookReturn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_return")
    private Long idReturn;

    private Boolean status;

    @Column(name = "date_return")
    private LocalDate returnExpectedDate;

    private LocalDate returnDate;

    @OneToOne
    @JoinColumn(name = "id_Loan", insertable = false, updatable = false)
    private Loan loan;


}
