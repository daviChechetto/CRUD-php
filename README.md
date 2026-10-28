# CRUD de Usuários (CakePHP & Node.js Frontend)

Aplicação completa de gerenciamento de usuários (CRUD) desenvolvida com **CakePHP 5** no backend (expondo uma API RESTful em formato JSON) e **Node.js com Express, jQuery e CSS moderno** no frontend.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** PHP 8.1+ com CakePHP 5.x
- **Banco de Dados:** MySQL / MariaDB (via WampServer / phpMyAdmin)
- **Frontend:** HTML5, CSS3, JavaScript (jQuery 3.7.1, SortableJS, OverlayScrollbars)
- **Servidor Frontend:** Node.js com Express
- **Ambiente Recomendado:** WampServer no Windows

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

1. **[WampServer](https://www.wampserver.com/)** (ou XAMPP / ambiente Apache + MySQL + PHP 8.1+)
   - O projeto deve estar localizado no diretório raiz do WAMP: `C:\wamp64\www\crud`
   - Extensões PHP recomendadas habilitadas: `pdo_mysql`, `intl`, `mbstring`.
2. **[Node.js](https://nodejs.org/)** (versão 18 ou superior) com npm.
3. **[Composer](https://getcomposer.org/)** (gerenciador de dependências PHP).

---

## 🚀 Como Rodar o Projeto (Passo a Passo)

### 1. Iniciar o WampServer
1. Abra o **WampServer** e aguarde o ícone na barra de tarefas ficar **verde** (indicando que Apache e MySQL estão rodando).

---

### 2. Configurar o Banco de Dados (MySQL)
1. Abra o **phpMyAdmin** pelo navegador em [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
2. Crie uma nova base de dados chamada **`banco_crud`** com colação `utf8mb4_unicode_ci`.
3. Na aba **SQL** da base `banco_crud`, execute o script abaixo para criar a tabela de usuários:

```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `created` DATETIME NOT NULL,
  `modified` DATETIME NOT NULL,
  `modified_by` DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

4. *(Opcional)* Insira um usuário inicial para testar o login e a listagem:

```sql
INSERT INTO `users` (`name`, `username`, `password`, `status`, `created`, `modified`)
VALUES ('Administrador', 'admin', 'admin123', 1, NOW(), NOW());
```

---

### 3. Configurar e Rodar o Backend (CakePHP)

#### Verificação de Credenciais
O arquivo de configuração local do CakePHP está em `backend/config/app_local.php`. Por padrão, ele está configurado para:
- **Host:** `localhost`
- **Database:** `banco_crud`
- **Usuário:** `root`
- **Senha:** ` ` (vazia, padrão do WampServer)

Caso o seu MySQL use senha diferente, altere no bloco `'Datasources' => ['default']`.

#### Instalação das dependências (caso necessário)
Se for a primeira vez ou se as dependências do CakePHP não estiverem instaladas:
```bash
cd backend
composer install
```

#### Execução da API
Como o projeto está na pasta `C:\wamp64\www\crud`, a API já é servida automaticamente pelo Apache do WAMP:
- **URL Base:** `http://localhost/crud/backend`
- **Teste de conexão:** acesse [http://localhost/crud/backend/users.json](http://localhost/crud/backend/users.json) no navegador para verificar se a lista de usuários é retornada.

> **Dica alternativa (Servidor embutido do CakePHP):**
> Se preferir não usar o Apache do WAMP para servir o PHP, você pode rodar:
> ```bash
> cd backend
> bin/cake server -p 8765
> ```
> *(Lembre-se de ajustar `apiUrl` em `frontend/assets/js/global.js` se mudar a porta/endereço).*

---

### 4. Configurar e Rodar o Frontend (Node.js)

1. Abra um terminal na pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor frontend:
   ```bash
   npm start
   ```
   *(ou `node server.js`)*

4. O terminal exibirá:
   ```text
   🚀 Servidor Frontend rodando na porta 3000
   👉 Acesse a lista de páginas em: http://localhost:3000/paginas
   ```

---

### 5. Acessando as Telas da Aplicação

Com o frontend e o backend em execução, abra no navegador:

- **Menu de Páginas / Hub:** [http://localhost:3000/paginas](http://localhost:3000/paginas)
- **Lista e Gerenciamento de Usuários:** [http://localhost:3000/lista-de-usuarios](http://localhost:3000/lista-de-usuarios)
- **Tela de Login:** [http://localhost:3000/screens/users/login.html](http://localhost:3000/screens/users/login.html)
- **Visualização de Usuário:** `http://localhost:3000/screens/users/view.html?id=1`
- **Edição de Usuário:** `http://localhost:3000/screens/users/edit.html?id=1`

---

## 📁 Estrutura de Pastas

```text
crud/
├── backend/                  # API REST em CakePHP 5
│   ├── config/               # Configurações de rotas, banco (app_local.php)
│   ├── src/
│   │   ├── Controller/       # UsersController.php (Endpoints JSON)
│   │   └── Model/            # UsersTable.php e Entidade User
│   └── webroot/              # Ponto de entrada público do CakePHP
│
├── frontend/                 # Aplicação Frontend
│   ├── assets/               # CSS, JavaScript e imagens
│   │   ├── css/              # Estilos personalizados (global.css, login.css, etc.)
│   │   └── js/               # Lógica de integração com a API (global.js, index.js, etc.)
│   ├── screens/              # Telas da aplicação (HTML)
│   │   ├── pages/            # Hub de páginas (pages.html)
│   │   └── users/            # Telas de usuários (index, view, edit, login)
│   ├── package.json          # Dependências do frontend
│   └── server.js             # Servidor Express com rotas amigáveis
└── README.md                 # Documentação do projeto
```

---

## 📡 Documentação da API REST

A API responde exclusivamente em formato **JSON**. Envie sempre os cabeçalhos:
- `Content-Type: application/json`
- `Accept: application/json`

### Campos da Entidade `User`:
- `id` (int): Identificador único
- `name` (string): Nome do usuário
- `username` (string): Nome de usuário / login (único)
- `password` (string): Senha do usuário
- `status` (boolean / tinyint): 1 para Ativo, 0 para Inativo
- `created` (datetime): Data de criação
- `modified` (datetime): Data da última modificação
- `modified_by` (datetime | null): Data da modificação pelo operador

---

### Rotas e Endpoints

#### 1. Listar todos os usuários
- **Método:** `GET`
- **Rota:** `/users.json`
- **Exemplo:**
  ```bash
  curl -X GET "http://localhost/crud/backend/users.json" \
    -H "Accept: application/json"
  ```
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Administrador",
      "username": "admin",
      "password": "senha",
      "status": true,
      "created": "2026-05-15T13:43:43+00:00",
      "modified": "2026-05-15T13:43:43+00:00",
      "modified_by": null
    }
  ]
  ```

#### 2. Visualizar um usuário específico
- **Método:** `GET`
- **Rota:** `/users/{id}.json`
- **Exemplo:**
  ```bash
  curl -X GET "http://localhost/crud/backend/users/1.json" \
    -H "Accept: application/json"
  ```
- **Resposta (200 OK):**
  ```json
  {
    "id": 1,
    "name": "Administrador",
    "username": "admin",
    "password": "senha",
    "status": true,
    "created": "2026-05-15T13:43:43+00:00",
    "modified": "2026-05-15T13:43:43+00:00",
    "modified_by": null
  }
  ```

#### 3. Criar um novo usuário
- **Método:** `POST`
- **Rota:** `/users.json`
- **Exemplo:**
  ```bash
  curl -X POST "http://localhost/crud/backend/users.json" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "name": "João Silva",
      "username": "joaosilva",
      "password": "senha123",
      "status": 1
    }'
  ```
- **Resposta (200 OK):**
  ```json
  {
    "user": {
      "name": "João Silva",
      "username": "joaosilva",
      "password": "senha123",
      "status": 1,
      "created": "2026-10-28T15:50:00+00:00",
      "modified": "2026-10-28T15:50:00+00:00",
      "id": 2
    },
    "status": "sucesso"
  }
  ```

#### 4. Atualizar um usuário existente
- **Método:** `PUT` ou `PATCH`
- **Rota:** `/users/{id}.json`
- **Exemplo:**
  ```bash
  curl -X PUT "http://localhost/crud/backend/users/1.json" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "name": "Administrador Geral",
      "status": 1
    }'
  ```
- **Resposta (200 OK):**
  ```json
  {
    "user": {
      "id": 1,
      "name": "Administrador Geral",
      "username": "admin",
      "password": "senha",
      "status": 1,
      "created": "2026-05-15T13:43:43+00:00",
      "modified": "2026-10-28T15:55:00+00:00",
      "modified_by": null
    },
    "status": "Usuário Administrador Geral atualizado com sucesso!"
  }
  ```

#### 5. Deletar um usuário
- **Método:** `DELETE` ou `POST`
- **Rota:** `/users/{id}.json`
- **Exemplo:**
  ```bash
  curl -X DELETE "http://localhost/crud/backend/users/1.json" \
    -H "Accept: application/json"
  ```
- **Resposta (200 OK):**
  ```json
  {
    "status": "Usuário Administrador Geral deletado com sucesso!"
  }
  ```

#### 6. Autenticação / Login
- **Método:** `POST`
- **Rota:** `/users/login.json`
- **Exemplo:**
  ```bash
  curl -X POST "http://localhost/crud/backend/users/login.json" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "username": "admin",
      "password": "admin123"
    }'
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "status": "sucesso",
    "message": "Credências reconhecidas! Sucesso ao tentar entrar.",
    "user": {
      "id": 1,
      "name": "Administrador",
      "username": "admin",
      "status": 1
    }
  }
  ```
