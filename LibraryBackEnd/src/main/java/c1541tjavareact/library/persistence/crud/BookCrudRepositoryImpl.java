package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.ImageDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.domain.repository.BookRepository;
import c1541tjavareact.library.domain.repository.ImageRepository;
import c1541tjavareact.library.domain.service.CloudinaryService;
import c1541tjavareact.library.domain.service.ImageService;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Image;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import c1541tjavareact.library.persistence.mapper.ImageDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookCrudRepositoryImpl implements BookCrudRepository {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDaoMapper bookDaoMapper;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageDaoMapper imageDaoMapper;


    @Override
    public List<BookDto> getAll() {
        List<Book> books = bookRepository.findAll();
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto save(BookDto bookDto) {
        Long idImage=0L;
        try {
            File fileBook=bookDto.getImage();
            BufferedImage bi = ImageIO.read(fileBook);
            Map result = cloudinaryService.uploadPrueba(fileBook);
            Image image = new Image();
            image.setName((String) result.get("original_filename"));
            image.setImagenUrl((String) result.get("url"));
            image.setCloudinaryId((String) result.get("public_id"));
            ImageDto imageSaved = imageDaoMapper.toImageDto(imageRepository.save(image));
            idImage = imageSaved.getIdImage();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("getme:   "+e.getMessage());
            throw new BibliotechException("La imagen no se pudo leer o ya existe " +
                    "No se pudo crear el libro");
        }
        bookDto.setIdImage(idImage);

        Book book = bookDaoMapper.toBook(bookDto);
        return bookDaoMapper.toBookDto(bookRepository.save(book));
    }

    @Override
    public Optional<BookDto> getBook(Long idBook) {
        return bookRepository.findById(idBook).map(Book -> bookDaoMapper.toBookDto(Book));
    }

    @Override
    public List<BookDto> searchBooksBytitleGenreAuthor(String titleGenreAuthor){
        List<Book> books = bookRepository.searchBooksBytitleGenreAuthor(titleGenreAuthor);
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto update(Long idBook, BookDto bookDto) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){
            BookDto bookToUpdate = optBook.get();
            bookToUpdate.setTitle(bookDto.getTitle());
            bookToUpdate.setIdAuthor(bookDto.getIdAuthor());
            bookToUpdate.setIdEditorial(bookDto.getIdEditorial());
            if(!bookToUpdate.getIsbn().equalsIgnoreCase(bookDto.getIsbn())){
                bookToUpdate.setIsbn(bookDto.getIsbn());
            }
            bookToUpdate.setIdGenre(bookDto.getIdGenre());
            bookToUpdate.setQuantity(bookDto.getQuantity());
            return this.save(bookToUpdate);
        }
        return null;
    }

    @Override
    public boolean delete(Long idBook) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){
            bookRepository.deleteById(idBook);
            return true;
        }
        return false;

    }

}
