// ==============================================
// ROTAS REST - COMIDAS
// ==============================================
const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET /api/comidas -> lista todas as comidas
router.get("/", async (req, res) => {
    try {
        const [linhas] = await db.query("SELECT * FROM comidas ORDER BY id");
        res.json(linhas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar comidas." });
    }
});

// POST /api/comidas -> cadastra uma nova comida
router.post("/", async (req, res) => {
    try {
        const { nome, descricao, preco, categoria, imagem, quantidade } = req.body;
        if (!nome || !preco) {
            return res.status(400).json({ erro: "Campos 'nome' e 'preco' são obrigatórios." });
        }

        const [resultado] = await db.query(
    "INSERT INTO comidas (nome, descricao, preco, categoria, imagem, quantidade) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, descricao, preco, categoria, imagem, quantidade || 0]
    
        );

        res.status(201).json({
            id: resultado.insertId,
            nome,
            descricao,
            preco,
            categoria,
            imagem
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao cadastrar comida." });
    }
});

// DELETE /api/comidas/:id -> exclui uma comida
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await db.query("DELETE FROM comidas WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Comida não encontrada." });
        }

        res.json({ mensagem: "Comida excluída com sucesso." });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao excluir comida." });
    }
});

module.exports = router;
