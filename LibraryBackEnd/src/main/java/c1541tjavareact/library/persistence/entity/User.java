package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastName;

    @Column(name = "identification_number",nullable = false)
    private String identificationNumber;

    @Column(name = "phone_number",nullable = false)
    private Long phoneNumber;

    @Column(nullable = false,unique = true)
    private String email;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "user")
    private List<Loan> loans;


}
