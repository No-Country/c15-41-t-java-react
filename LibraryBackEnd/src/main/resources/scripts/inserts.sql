INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (1, 'Doe', 'John');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (2, 'Smith', 'Alice');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (3, 'Johnson', 'Michael');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (4, 'Brown', 'Emma');
INSERT IGNORE INTO authors (id_author, last_name, name) VALUES (5, 'Garcia', 'Daniel');

INSERT IGNORE INTO editorials (id_editorial, established_date, name) VALUES (1, '2020-01-15', 'Tech Publications');
INSERT IGNORE INTO editorials (id_editorial, established_date, name) VALUES (2, '2015-08-22', 'Literary Works');
INSERT IGNORE INTO editorials (id_editorial, established_date, name) VALUES (3, '2000-05-10', 'Science Books');
INSERT IGNORE INTO editorials (id_editorial, established_date, name) VALUES (4, '1998-12-03', 'Artistic Press');
INSERT IGNORE INTO editorials (id_editorial, established_date, name) VALUES (5, '2012-06-28', 'Historical Editions');

INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (1, '111112', 'juan.perez11@gmail.com', 'Juan', 'Perez', '111111112', 'Calle Falsa 123', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (2, '222223', 'maria.gomez12@gmail.com', 'Maria', 'Gomez', '222222223', 'Calle real 456', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (3, '333334', 'carlos.lopez13@gmail.com', 'Carlos', 'Lopez', '333333334', 'Calle principal 789', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (4, '444445', 'lucia.martinez14@gmail.com', 'Lucia', 'Martinez', '444444445', 'Calle del medio 012', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (5, '555556', 'javier.rodriguez15@gmail.com', 'Javier', 'Rodriguez', '555555556', 'Calle country 345', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (6, '666667', 'sofia.fernandez16@gmail.com', 'Sofia', 'Fernandez', '666666667', 'Calle plata 678', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (7, '777778', 'martin.gonzalez17@gmail.com', 'Martin', 'Gonzalez', '777777778', 'Calle bombonera 901', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (8, '888889', 'valentina.diaz18@gmail.com', 'Valentina', 'Diaz', '888888889', 'Calle del oceano 234', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (9, '999990', 'facundo.fernandez19@gmail.com', 'Facundo', 'Fernandez', '999999990', 'Calle del norte 567', true);
INSERT IGNORE INTO users (id_user, dni, email, name, last_name, phone_number, address, is_active) VALUES (10, '101011', 'natalia.molina20@gmail.com', 'Natalia', 'Molina', '101010111', 'Calle ultima', true);

INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (1, 'Harry Potter 1', '978-665527862', 'ACTION', 2, 1, 1);
INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (2, 'Cien años de soledad', '978-0307474729', 'FANTASY', 5, 2, 2);
INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (3, 'El túnel', '978-0307473272', 'THRILLER', 10, 3, 3);
INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (4, 'Martín Fierro', '978-9871135477', 'ADVENTURE', 8, 4, 4);
INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (5, 'Don Quijote de la Mancha', '978-8424172629', 'ACTION', 12, 5, 5);
INSERT IGNORE INTO books (id_book, title, isbn, genre, quantity, id_author, id_editorial) VALUES (6, 'Fahrenheit 451', '978-8490321478', 'Fantasy', 6, 1, 2);

INSERT IGNORE INTO admins (id_admin, name, last_name, email, password) VALUES (1, 'José', 'Lara', 'jose.lara@gmail.com', '$2a$10$nFqAPEAI/QjNNunc1q3yt.jm8WKW/iNU9.ee0WamKdwqLnp2Ai4jK');