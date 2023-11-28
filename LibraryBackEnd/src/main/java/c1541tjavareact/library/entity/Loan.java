package c1541tjavareact.library.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author jdmon on 27/11/2023
 * @project LibraryBackEnd
 */
@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_book")
    @NotNull
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_admin")
    @NotNull
    private Admin admin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    @NotNull
    private User user;

    @Column(name = "loan_date")
    @NotNull
    private Date loanDate;

    @Column(name = "return_date")
    @NotNull
    private Date returnDate;
    //mappedBy indicates that the entity that owns the relationship is loan and bookReturn is the inverse
    @OneToOne(mappedBy = "loan")
    private BookReturn bookReturn;


}
