const express = require('express');
const path = require('path');
const { Eta } = require('eta');
const app = express();
const port = 3000;

// Configuração do motor Eta (v4)
const eta = new Eta({
    views: path.join(__dirname, 'screens'),
    cache: process.env.NODE_ENV === 'production'
});

app.engine('eta', (filePath, options, callback) => {
    try {
        const fileContent = eta.readFile(filePath);
        const rendered = eta.renderString(fileContent, { ...options, filepath: filePath });
        return callback(null, rendered);
    } catch (erro) {
        return callback(erro);
    }
});
app.set('view engine', 'eta');
app.set('views', path.join(__dirname, 'screens'));

// ARQUIVOS ESTÁTICOS
// Libera o carregamento de CSS, JS, Imagens, Fontes e Módulos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/fonts', express.static(path.join(__dirname, 'assets', 'fonts')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// ROTAS AMIGÁVEIS E COMPATIBILIDADE (O Express buscará os arquivos com final .eta automaticamente)

// --- Rota Raiz (Home) ---
app.get('/', (requisicao, resposta) => {
    resposta.render('home', { title: 'Início - Painel de Controle' });
});

// --- Rotas de Páginas ---
app.get(['/paginas', '/pages', '/pages.html'], (requisicao, resposta) => {
    resposta.render('pages/index', { title: 'Listagem de Páginas' });
});

app.get(['/paginas/nova-pagina', '/nova-pagina'], (requisicao, resposta) => {
    resposta.render('pages/add');
});

app.get(['/paginas/visualizar', '/visualizar-pagina'], (requisicao, resposta) => {
    resposta.render('pages/view');
});

// --- Rotas de Usuários ---
app.get(['/lista-de-usuarios', '/usuarios'], (requisicao, resposta) => {
    resposta.render('users/index');
});

app.get(['/visualizar-usuario', '/visualizar-usuario/:slug_do_usuario'], (requisicao, resposta) => {
    resposta.render('users/view');
});

app.get(['/editar-usuario', '/editar-usuario/:slug_do_usuario'], (requisicao, resposta) => {
    resposta.render('users/edit');
});

app.get(['/login', '/login.html'], (requisicao, resposta) => {
    resposta.render('users/login');
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
    resposta.status(404).render('404');
});

// LIGAR O SERVIDOR
app.listen(port, () => {
    console.log(`🚀 Servidor Frontend rodando na porta ${port}`);
    console.log(`👉 Início: http://localhost:${port}/`);
});
