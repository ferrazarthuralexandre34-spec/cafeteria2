// db/db.js
// Responsável pela conexão com o banco de dados MySQL
// Usa variáveis de ambiente (funciona local E em produção, ex: Railway)

require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafeteria',
    port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL (cafeteria) com sucesso!');
});

module.exports = connection;
