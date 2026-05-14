<?php

declare(strict_types=1);

namespace App\Controller;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController
{
    public function index()
    {
        // 1. Busca todos os usuários no banco de dados
        $users = $this->Users->find('all');

        // 2. Envia a variável para a camada de visualização
        $this->set(compact('users'));

        // 3. Diz ao CakePHP para transformar a variável 'users' em JSON
        $this->viewBuilder()->setClassName('Json');
        $this->viewBuilder()->setOption('serialize', 'users');
    }
    public function add()
    {
        // 1. Cria uma entidade vazia (representa uma nova linha no banco)
        $user = $this->Users->newEmptyEntity();

        // 2. Preenche essa entidade com os dados que vieram na requisição
        $user = $this->Users->patchEntity($user, $this->request->getData());

        // 3. Tenta salvar no banco de dados
        if ($this->Users->save($user)) {
            $status = 'sucesso';
        } else {
            $status = 'erro';
        }

        // 4. Prepara a resposta em JSON
        $this->set(compact('user', 'status'));
        $this->viewBuilder()->setClassName('Json');
        $this->viewBuilder()->setOption('serialize', ['user', 'status']);
    }
}
