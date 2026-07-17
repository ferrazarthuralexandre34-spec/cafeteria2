const express = require('express');
const cors = require('cors');

const comidasRouter = require('../routes/comidas');
const bebidasRouter = require('../routes/bebidas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

app.use('/api/comidas', comidasRouter);
app.use('/api/bebidas', bebidasRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});