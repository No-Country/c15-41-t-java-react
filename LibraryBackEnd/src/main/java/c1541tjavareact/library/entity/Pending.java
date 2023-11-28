package c1541tjavareact.library.entity;

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

    @OneToOne
    @JoinColumn(name = "id_book_return",nullable = false,
    referencedColumnName = "id_return")
    private BookReturn bookReturn;

    @Column(name = "local_pending_date",nullable = false)
    private LocalDate localPendingDate;

    @Column(nullable = false)
    private String message;
}
