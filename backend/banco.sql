-- ==============================================
-- BANCO DE DADOS - CAFETERIA
-- ==============================================

CREATE DATABASE IF NOT EXISTS cafeteria;

USE cafeteria;

-- Tabela de bebidas
CREATE TABLE IF NOT EXISTS bebidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL,
    tamanho VARCHAR(50),
    imagem VARCHAR(500)
);

-- Tabela de comidas
CREATE TABLE IF NOT EXISTS comidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    imagem VARCHAR(500)
);

-- Registros de bebidas (5)
INSERT INTO bebidas (nome, descricao, preco, tamanho, imagem) VALUES
('Espresso', 'Café forte e aromático.', 8.00, 'Pequeno', 'img/espresso.jpg'),
('Cappuccino', 'Leite vaporizado e espuma cremosa.', 15.00, 'Médio', 'img/cappuccino.jpg'),
('Mocha', 'Café com chocolate e chantilly.', 18.00, 'Médio', 'img/mocha.jpg'),
('Café Latte', 'Café expresso com leite cremoso.', 16.00, 'Grande', 'img/latte.jpg'),
('Macchiato', 'Espresso com uma pitada de espuma de leite.', 14.00, 'Pequeno', 'img/macchiato.jpg');

-- Registros de comidas (5)
INSERT INTO comidas (nome, descricao, preco, categoria, imagem) VALUES
('Croissant', 'Massa folhada amanteigada.', 12.00, 'Salgado', 'img/croissant.jpg'),
('Cheesecake', 'Cheesecake com calda de frutas vermelhas.', 18.00, 'Doce', 'img/cheesecake.jpg'),
('Brownie', 'Brownie de chocolate com nozes.', 14.00, 'Doce', 'img/brownie.jpg'),
('Sanduíche Natural', 'Pão integral com peito de peru e salada.', 22.00, 'Salgado', 'img/sanduiche.jpg'),
('Pão de Queijo', 'Tradicional pão de queijo mineiro, quentinho.', 8.00, 'Salgado', 'img/pao-de-queijo.jpg');

SELECT * FROM bebidas;
SELECT * FROM comidas;
