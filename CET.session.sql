INSERT INTO users (username, email, password) VALUES
    ('Aman', '24bph006@gmail.com' , 'Aman5129x')

        SELECT * FROM users;

        CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(7) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);