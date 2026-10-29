const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// ARQUIVOS ESTÁTICOS
// Libera o carregamento de CSS, JS, Imagens, Fontes e Módulos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/fonts', express.static(path.join(__dirname, 'assets', 'fonts')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// ROTAS AMIGÁVEIS E COMPATIBILIDADE

// --- Rota Raiz (Home) ---
app.get('/', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'home.html'));
});

// --- Rotas de Páginas ---
app.get(['/paginas', '/pages', '/pages.html'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'pages', 'index.html'));
});

app.get(['/paginas/nova-pagina', '/nova-pagina'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'pages', 'add.html'));
});

app.get(['/paginas/visualizar', '/visualizar-pagina'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'pages', 'view.html'));
});

// --- Rotas de Usuários ---
app.get(['/lista-de-usuarios', '/usuarios'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'users', 'index.html'));
});

app.get(['/visualizar-usuario', '/visualizar-usuario/:slug_do_usuario'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'users', 'view.html'));
});

app.get(['/editar-usuario', '/editar-usuario/:slug_do_usuario'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'users', 'edit.html'));
});

app.get(['/login', '/login.html'], (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'screens', 'users', 'login.html'));
});

// Middleware de proteção para arquivos estáticos requisitados com caminho relativo em rotas aninhadas
app.use((requisicao, resposta, proximo) => {
    if (requisicao.path.includes('/assets/')) {
        return resposta.sendFile(path.join(__dirname, requisicao.path.substring(requisicao.path.indexOf('/assets/'))));
    }
    if (requisicao.path.includes('/node_modules/')) {
        return resposta.sendFile(path.join(__dirname, requisicao.path.substring(requisicao.path.indexOf('/node_modules/'))));
    }
    proximo();
});

// TRATAMENTO DE ERRO (Rota 404)
app.use((requisicao, resposta) => {
    resposta.status(404).sendFile(path.join(__dirname, 'screens', '404.html'));
});

// LIGAR O SERVIDOR
app.listen(port, () => {
    console.log(`🚀 Servidor Frontend rodando na porta ${port}`);
    console.log(`👉 Início: http://localhost:${port}/`);
    console.log(`👉 Hub de páginas: http://localhost:${port}/paginas`);
    console.log(`👉 Lista de usuários: http://localhost:${port}/lista-de-usuarios`);
});
