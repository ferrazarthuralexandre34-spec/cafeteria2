// ==============================================
// ROTAS REST - BEBIDAS
// ==============================================
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET /api/bebidas -> lista todas as bebidas
router.get("/", async (req, res) => {
    try {
        const [linhas] = await db.query("SELECT * FROM bebidas ORDER BY id");
        res.json(linhas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar bebidas." });
    }
});

// POST /api/bebidas -> cadastra uma nova bebida
router.post("/", async (req, res) => {
    try {
       const { nome, descricao, preco, tamanho, imagem, quantidade, ml } = req.body;

        if (!nome || !preco) {
            return res.status(400).json({ erro: "Campos 'nome' e 'preco' são obrigatórios." });
        }
const [resultado] = await db.query(
    "INSERT INTO bebidas (nome, descricao, preco, tamanho, imagem, quantidade, ml) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nome, descricao, preco, tamanho, imagem, quantidade || 0, ml || null]

        );

        res.status(201).json({
            id: resultado.insertId,
            nome,
            descricao,
            preco,
            tamanho,
            imagem
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao cadastrar bebida." });
    }
});

// DELETE /api/bebidas/:id -> exclui uma bebida
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await db.query("DELETE FROM bebidas WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Bebida não encontrada." });
        }

        res.json({ mensagem: "Bebida excluída com sucesso." });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao excluir bebida." });
    }
});

module.exports = router;
