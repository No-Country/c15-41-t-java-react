package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "pendings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pending implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pending")
    private long idPending;

    @Column(nullable = false)
    private String message;

    @Column(name = "local_pending_date",nullable = false)
    private LocalDate localPendingDate;

    @Column(nullable = false)
    private Boolean status;

    @Column(name = "id_loan", nullable = false)
    private Long idLoan;

    @OneToOne
    @JoinColumn(name = "id_loan",nullable = false,
            insertable = false, updatable = false)
    private Loan loan;
}
