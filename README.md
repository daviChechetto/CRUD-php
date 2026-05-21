# CRUD-php

## Documentação da API

Esta aplicação backend usa CakePHP para expor uma API JSON para gerenciamento de usuários.

### URL Base

Quando o projeto estiver rodando no servidor local, a URL base é:

`http://localhost/crud/backend`

> Em muitas configurações do WAMP, a pasta `www` mapeia para `http://localhost/`.

### Formato de resposta

A API responde em JSON. Sempre envie o cabeçalho:

- `Content-Type: application/json`
- `Accept: application/json`

### Campos de usuário

A entidade `User` contém os seguintes campos:

- `id` (inteiro)
- `name` (string)
- `username` (string)
- `password` (string)
- `created` (datetime)
- `modified` (datetime)
- `modified_by` (datetime ou null)
- `status` (boolean)

---

## Rotas disponíveis

### 1. Listar todos os usuários

- Método: `GET`
- Rota: `/users.json`
- Exemplo:
  ```bash
  curl -X GET "http://localhost/crud/backend/users.json" \
    -H "Accept: application/json"
  ```
- Resposta:
  ```json
  {
    "users": [
      {
        "id": 1,
        "name": "Nome do usuário",
        "username": "usuario",
        "password": "senha",
        "created": "2026-05-15 13:43:43",
        "modified": "2026-05-15 13:43:43",
        "modified_by": null,
        "status": 1
      }
    ]
  }
  ```

### 2. Ver um usuário específico

- Método: `GET`
- Rota: `/users/{id}.json`
- Exemplo:
  ```bash
  curl -X GET "http://localhost/crud/backend/users/1.json" \
    -H "Accept: application/json"
  ```
- Resposta:
  ```json
  {
    "user": {
      "id": 1,
      "name": "Nome do usuário",
      "username": "usuario",
      "password": "senha",
      "created": "2026-05-15 13:43:43",
      "modified": "2026-05-15 13:43:43",
      "modified_by": null,
      "status": 1
    }
  }
  ```

### 3. Criar um novo usuário

- Método: `POST`
- Rota: `/users.json`
- Exemplo:
  ```bash
  curl -X POST "http://localhost/crud/backend/users.json" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "name": "Novo Usuário",
      "username": "novo_usuario",
      "password": "senha123",
      "status": 1
    }'
  ```
- Corpo esperado:
  ```json
  {
    "name": "Novo Usuário",
    "username": "novo_usuario",
    "password": "senha123",
    "status": 1
  }
  ```
- Resposta de sucesso:
  ```json
  {
    "user": {
      "id": 2,
      "name": "Novo Usuário",
      "username": "novo_usuario",
      "password": "senha123",
      "created": "2026-05-21 00:00:00",
      "modified": "2026-05-21 00:00:00",
      "modified_by": null,
      "status": 1
    },
    "status": "sucesso"
  }
  ```

### 4. Atualizar um usuário existente

- Método: `PUT` ou `PATCH`
- Rota: `/users/{id}.json`
- Exemplo:
  ```bash
  curl -X PUT "http://localhost/crud/backend/users/1.json" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "name": "Usuário Atualizado",
      "username": "usuario_atualizado",
      "password": "nova_senha",
      "status": 1
    }'
  ```
- Corpo possível:
  ```json
  {
    "name": "Usuário Atualizado",
    "username": "usuario_atualizado",
    "password": "nova_senha",
    "status": 1
  }
  ```
- Resposta de sucesso:
  ```json
  {
    "user": {
      "id": 1,
      "name": "Usuário Atualizado",
      "username": "usuario_atualizado",
      "password": "nova_senha",
      "created": "2026-05-15 13:43:43",
      "modified": "2026-05-21 00:00:00",
      "modified_by": null,
      "status": 1
    },
    "status": "Usuário Usuário Atualizado atualizado com sucesso!"
  }
  ```

### 5. Deletar um usuário

- Método: `DELETE`
- Rota: `/users/{id}.json`
- Exemplo:
  ```bash
  curl -X DELETE "http://localhost/crud/backend/users/1.json" \
    -H "Accept: application/json"
  ```
- Observação: o controller também aceita `POST` para exclusão em rotas RESTful padrão do CakePHP.
- Resposta de sucesso:
  ```json
  {
    "status": "Usuário Nome do usuário deletado com sucesso!"
  }
  ```

---

## Observações importantes

- As rotas são geradas automaticamente por `resources('Users')` no CakePHP.
- Para forçar saída JSON, use a extensão `.json` nas URLs.
- Se usar uma aplicação cliente em JavaScript, certifique-se de enviar o corpo em JSON e os headers `Content-Type` e `Accept` corretamente.
- O campo `modified_by` pode ser `null` se não for informado.

## Exemplo em JavaScript

```js
fetch('http://localhost/crud/backend/users.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    name: 'Teste',
    username: 'teste',
    password: '123456',
    status: 1,
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

