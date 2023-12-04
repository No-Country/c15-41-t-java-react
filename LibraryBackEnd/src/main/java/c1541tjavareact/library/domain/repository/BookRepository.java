package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
     @Query("""
            SELECT b FROM Book b
            JOIN Author a ON b.idAuthor = a.idAuthor
            WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :param, '%')) OR
                    LOWER(a.name) LIKE LOWER(CONCAT('%', :param, '%')) OR
                    LOWER(a.lastName) LIKE LOWER(CONCAT('%', :param, '%'))
            """)
    List<Book> searchBooksBytitleGenreAuthor(@Param("param") String param);//TODO genre
}
