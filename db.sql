CREATE DATABSE bookDB;
CREATE TABLE book(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(30),
    description VARCHAR(255)
);

INSERT INTO book(id, name, description)
VALES(
    101,
    X,
    beautiful book
);