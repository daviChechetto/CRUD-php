const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. ARQUIVOS ESTÁTICOS
// Libera o carregamento de CSS, JS, Imagens, Fontes e Módulos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 2. ROTAS AMIGÁVEIS E COMPATIBILIDADE

// --- Rota Raiz (Padrão) ---
app.get('/', (req, res) => {
    res.redirect('/paginas');
});

// --- Rotas de Páginas ---
app.get(['/paginas', '/pages', '/pages.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'pages', 'pages.html'));
});

// --- Rotas de Usuários ---
app.get(['/lista-de-usuarios', '/usuarios', '/users', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'index.html'));
});

app.get(['/visualizar-usuario', '/view.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'view.html'));
});

app.get(['/editar-usuario', '/edit.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'edit.html'));
});

app.get(['/login', '/login.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'login.html'));
});

// 3. TRATAMENTO DE ERRO (Rota 404)
app.use((req, res) => {
    res.status(404).send('<h1>Página não encontrada (Erro 404)</h1><a href="/paginas">Voltar ao início</a>');
});

// 4. LIGAR O SERVIDOR
app.listen(port, () => {
    console.log(`🚀 Servidor Frontend rodando na porta ${port}`);
    console.log(`👉 Hub de páginas: http://localhost:${port}/paginas`);
    console.log(`👉 Lista de usuários: http://localhost:${port}/lista-de-usuarios`);
});
