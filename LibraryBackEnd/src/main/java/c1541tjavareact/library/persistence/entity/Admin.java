package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
public class Admin implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Long idAdmin;

    @Column(nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false,unique = true)
    private String email;

    @OneToMany (mappedBy = "admin")
    private List <Loan> loans;

    @Column(nullable = false)
    private String password;

}