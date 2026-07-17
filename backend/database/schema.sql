-- ==============================================
-- BANCO DE DADOS: CAFETERIA
-- ==============================================

CREATE DATABASE IF NOT EXISTS cafeteria;
USE cafeteria;

DROP TABLE IF EXISTS comidas;
DROP TABLE IF EXISTS bebidas;

-- ==============================================
-- TABELA: comidas
-- ==============================================
CREATE TABLE comidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    imagem LONGTEXT
);

INSERT INTO comidas (nome, descricao, preco, categoria, quantidade, imagem) VALUES
('Pão de Queijo', 'Tradicional pão de queijo mineiro, quentinho', 8.50, 'Salgado', 20, NULL),
('Croissant', 'Croissant amanteigado folhado, feito no forno', 12.00, 'Doce', 15, NULL),
('Bolo de Cenoura', 'Fatia de bolo de cenoura com cobertura de chocolate', 9.90, 'Doce', 10, NULL),
('Sanduíche Natural', 'Sanduíche de peito de peru com queijo e alface', 15.00, 'Salgado', 12, NULL),
('Torta de Frango', 'Fatia de torta de frango com catupiry', 13.50, 'Salgado', 8, NULL),
('Cookie Chocolate', 'Cookie artesanal com gotas de chocolate', 7.00, 'Doce', 25, NULL);

-- ==============================================
-- TABELA: bebidas
-- ==============================================
CREATE TABLE bebidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    tamanho VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    ml INT NOT NULL DEFAULT 0,
    imagem LONGTEXT
);

INSERT INTO bebidas (nome, descricao, preco, tamanho, quantidade, ml, imagem) VALUES
('Café Expresso', 'Café expresso tradicional, torra média', 6.00, 'Pequeno', 30, 60, NULL),
('Cappuccino', 'Café com espuma de leite e canela', 10.00, 'Médio', 20, 200, NULL),
('Chocolate Quente', 'Chocolate cremoso servido quente', 11.50, 'Médio', 15, 250, NULL),
('Chá Gelado', 'Chá de frutas vermelhas servido gelado', 8.00, 'Grande', 18, 400, NULL),
('Latte Caramelo', 'Café com leite e calda de caramelo', 12.50, 'Grande', 10, 350, NULL),
('Suco Natural', 'Suco de laranja natural, feito na hora', 9.00, 'Médio', 22, 300, NULL);
