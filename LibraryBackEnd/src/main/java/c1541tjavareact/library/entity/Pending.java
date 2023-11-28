package c1541tjavareact.library.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "pending")
public @Data class Pending implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPending;

    @OneToOne(mappedBy = "address")
    private Return idReturn;

    private Date localDate;

    private String message;
}
