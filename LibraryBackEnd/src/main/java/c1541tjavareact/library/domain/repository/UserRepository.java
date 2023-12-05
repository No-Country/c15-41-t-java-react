package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//    User findByAddress(String searchParam);
//
//    User findByEmail(String searchParam);
//
//    User findByPhoneNumber(String searchParam);
//
//    List<User> findByLastName(String lastName);
//
//    List<User> findByName(String searchParam);
//
//    User findByDni(String dni);
//
//    Optional<User> findById(Long idUser);

}
