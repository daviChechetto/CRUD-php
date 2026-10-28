const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

<<<<<<< HEAD
// LIBERAR AS "RODOVIAS PÚBLICAS" (Arquivos Estáticos)
// Isso permite que o navegador carregue seu CSS, JS e Imagens normalmente
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// O GUARDA DE TRÂNSITO (Rotas Amigáveis)
// Quando o usuário digita a rota limpa, o Express entrega o HTML escondido na pasta screens

// --- Rotas de Usuários ---
app.get('/lista-usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'index.html'));
});
app.get('/novo-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'users', 'add.html'));
});

// --- Rotas de Páginas ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'home.html'));
});
app.get('/paginas', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'pages', 'index.html'));
});
app.get('/paginas/nova-pagina', (req, res) => {
    res.sendFile(path.join(__dirname, 'screens', 'pages', 'add.html'));
});

// 3. TRATAMENTO DE ERRO (Rota 404)
// Se o usuário digitar uma URL que não existe no mapa acima, cai aqui
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'screens', '404.html'));
=======
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
>>>>>>> feature/davi-pages
});

// 4. LIGAR O SERVIDOR
app.listen(port, () => {
    console.log(`🚀 Servidor Frontend rodando na porta ${port}`);
<<<<<<< HEAD
    console.log(`👉 Acesse a lista de páginas em: http://localhost:${port}/`);
});
=======
    console.log(`👉 Hub de páginas: http://localhost:${port}/paginas`);
    console.log(`👉 Lista de usuários: http://localhost:${port}/lista-de-usuarios`);
});
>>>>>>> feature/davi-pages
