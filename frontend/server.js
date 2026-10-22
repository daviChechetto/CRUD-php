const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. LIBERAR AS "RODOVIAS PÚBLICAS" (Arquivos Estáticos)
// Isso permite que o navegador carregue seu CSS, JS e Imagens normalmente
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 2. O GUARDA DE TRÂNSITO (Rotas Amigáveis)
// Quando o usuário digita a rota limpa, o Express entrega o HTML escondido na pasta screens

// --- Rotas de Usuários ---
app.get('/lista-usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'index.html'));
});
app.get('/novo-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'add.html'));
});

// --- Rotas de Páginas ---
app.get('/paginas', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'pages', 'index.html'));
});
app.get('/nova-pagina', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'pages', 'add.html'));
});

// 3. TRATAMENTO DE ERRO (Rota 404)
// Se o usuário digitar uma URL que não existe no mapa acima, cai aqui
app.use((req, res) => {
    res.status(404).send('<h1>Página não encontrada (Erro 404)</h1><a href="/paginas">Voltar ao início</a>');
});

// 4. LIGAR O SERVIDOR
app.listen(port, () => {
    console.log(`🚀 Servidor Frontend rodando na porta ${port}`);
    console.log(`👉 Acesse a lista de páginas em: http://localhost:${port}/paginas`);
});