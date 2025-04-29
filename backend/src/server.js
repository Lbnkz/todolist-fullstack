const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, "0.0.0.0", () => {
    console.log('Servidor rodando na porta 8081')
});