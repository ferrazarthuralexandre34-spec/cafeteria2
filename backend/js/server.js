// js/server.js
// Servidor principal da API da Cafeteria

const express = require('express');
const cors = require('cors');
const db = require('../db/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// limite maior para aceitar fotos em base64 no corpo da requisição
app.use(express.json({ limit: '15mb' }));

// ==============================================
// ROTAS: COMIDAS
// ==============================================

// Listar todas as comidas
app.get('/api/comidas', (req, res) => {
    db.query('SELECT * FROM comidas ORDER BY id DESC', (err, resultados) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(resultados);
    });
});

// Cadastrar nova comida
app.post('/api/comidas', (req, res) => {
    const { nome, descricao, preco, categoria, quantidade, imagem } = req.body;

    if (!nome || !descricao || !preco || !categoria) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO comidas (nome, descricao, preco, categoria, quantidade, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [nome, descricao, preco, categoria, quantidade || 0, imagem || null];

    db.query(sql, valores, (err, resultado) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: resultado.insertId, nome, descricao, preco, categoria, quantidade, imagem });
    });
});

// Excluir comida
app.delete('/api/comidas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM comidas WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: 'Comida excluída com sucesso.' });
    });
});

// ==============================================
// ROTAS: BEBIDAS
// ==============================================

// Listar todas as bebidas
app.get('/api/bebidas', (req, res) => {
    db.query('SELECT * FROM bebidas ORDER BY id DESC', (err, resultados) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(resultados);
    });
});

// Cadastrar nova bebida
app.post('/api/bebidas', (req, res) => {
    const { nome, descricao, preco, tamanho, quantidade, ml, imagem } = req.body;

    if (!nome || !descricao || !preco || !tamanho) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO bebidas (nome, descricao, preco, tamanho, quantidade, ml, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const valores = [nome, descricao, preco, tamanho, quantidade || 0, ml || 0, imagem || null];

    db.query(sql, valores, (err, resultado) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: resultado.insertId, nome, descricao, preco, tamanho, quantidade, ml, imagem });
    });
});

// Excluir bebida
app.delete('/api/bebidas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM bebidas WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: 'Bebida excluída com sucesso.' });
    });
});

// ==============================================
// INICIAR SERVIDOR
// ==============================================
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
