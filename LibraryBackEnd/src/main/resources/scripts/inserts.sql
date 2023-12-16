INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (1, 'Doe', 'John');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (2, 'Smith', 'Alice');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (3, 'Johnson', 'Michael');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (4, 'Brown', 'Emma');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (5, 'Garcia', 'Daniel');

INSERT IGNORE INTO editorials (id_editorial, name) VALUES (1, 'Tech Publications');
INSERT IGNORE INTO editorials (id_editorial, name) VALUES (2, 'Literary Works');
INSERT IGNORE INTO editorials (id_editorial, name) VALUES (3, 'Science Books');
INSERT IGNORE INTO editorials (id_editorial, name) VALUES (4, 'Artistic Press');
INSERT IGNORE INTO editorials (id_editorial, name) VALUES (5, 'Historical Editions');

INSERT IGNORE INTO genres(id_genre, name) VALUES (1, 'Action');
INSERT IGNORE INTO genres(id_genre, name) VALUES (2, 'Fantasy');
INSERT IGNORE INTO genres(id_genre, name) VALUES (3, 'Thriller');
INSERT IGNORE INTO genres(id_genre, name) VALUES (4, 'Adventure');

INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (1, '1111121', 'juan.perez11@gmail.com', 'Juan', 'Perez', '1111111121', 'Calle Falsa 123', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (2, '22222311', 'maria.gomez12@gmail.com', 'Maria', 'Gomez', '2222222231', 'Calle real 456', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (3, '3333341', 'carlos.lopez13@gmail.com', 'Carlos', 'Lopez', '3333333341', 'Calle principal 789', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (4, '44444511', 'lucia.martinez14@gmail.com', 'Lucia', 'Martinez', '4444444451', 'Calle del medio 012', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (5, '5555516122', 'javier.rodriguez15@gmail.com', 'Javier', 'Rodriguez', '5555555561', 'Calle country 345', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (6, '66666711', 'sofia.fernandez16@gmail.com', 'Sofia', 'Fernandez', '6666666671', 'Calle plata 678', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (7, '77777811', 'martin.gonzalez17@gmail.com', 'Martin', 'Gonzalez', '7777777781', 'Calle bombonera 901', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (8, '88888911', 'valentina.diaz18@gmail.com', 'Valentina', 'Diaz', '8888888891', 'Calle del oceano 234', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (9, '9999901112', 'perritogarces2@gmail.com', 'Facundo', 'Fernandez', '9999999901', 'Calle del norte 567', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (10, '1010111211', 'perritogarces@gmail.com', 'Natalia', 'Molina', '1010101111', 'Calle ultima', true);

INSERT IGNORE INTO images (id_image, cloudinary_id, imagen_url, name) VALUES (1,"Bibliotech/ruqlsc5r0qdz6qwpc02x", "http://res.cloudinary.com/dnasbdg0i/image/upload/v1702762612/Bibliotech/ruqlsc5r0qdz6qwpc02x.jpg","Bibliotech");

INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (1, 'Harry Potter 1', '978-3-16-148410-1', 1, 2, 1, 1, 1);
INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (2, 'Cien años de soledad', '978-3-16-148410-2', 2, 5, 2, 2, 1);
INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (3, 'El túnel', '978-3-16-148410-3', 3, 10, 3, 3, 1);
INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (4, 'Martín Fierro', '978-3-16-148410-4', 4, 8, 4, 4, 1);
INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (5, 'Don Quijote de la Mancha', '978-3-16-148410-5', 1, 12, 5, 5, 1);
INSERT IGNORE INTO books (id_book, title, isbn, id_genre, quantity, id_author, id_editorial, id_image) VALUES (6, 'Fahrenheit 451', '978-3-16-148410-6', 2, 6, 1, 2, 1);

INSERT IGNORE INTO admins (id_admin, name, last_name, email, password) VALUES (1, 'José', 'Lara', 'jose.lara@gmail.com', '$2a$10$nFqAPEAI/QjNNunc1q3yt.jm8WKW/iNU9.ee0WamKdwqLnp2Ai4jK');
INSERT IGNORE INTO admins (id_admin, name, last_name, email, password) VALUES (2, 'José', 'Lara', 'bibliotech.c15@gmail.com', '$2a$12$YWG.dX4vnhM/1sMIwvsee.lYghep2sVhgcmghaoFxESPnnIeOSwgK');