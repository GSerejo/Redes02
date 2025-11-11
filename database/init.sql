CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL, -- NOTA: Use HASH (bcrypt) no mundo real!
    name VARCHAR(100)
);

-- REQUISITO CUMPRIDO: Dois usuários cadastrados
INSERT INTO users (username, password, name) VALUES 
('user1', 'pass1', 'Fulano de Tal'),
('user2', 'pass2', 'Ciclano da Silva');