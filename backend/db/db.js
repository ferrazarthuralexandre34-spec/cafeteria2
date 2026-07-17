// db/db.js
// Responsável pela conexão com o banco de dados MySQL
// Usa variáveis de ambiente (funciona local E em produção, ex: Railway)

require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafeteria',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then((conn) => {
        console.log('Conectado ao banco de dados MySQL com sucesso!');
        conn.release();
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    });

module.exports = pool;
