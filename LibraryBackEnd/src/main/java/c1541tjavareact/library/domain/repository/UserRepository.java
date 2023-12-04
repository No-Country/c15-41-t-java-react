package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public List<User> searchByName(String searchParam);

    public List<User> searchByLastname(String searchParam);

    public User searchByPhoneNumber(String searchParam);

    public User searchByEmail(String searchParam);

    public User searchByAddress(String searchParam);

}
