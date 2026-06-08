<?php

declare(strict_types=1);

namespace App\Controller;

use Psr\Http\Message\UploadedFileInterface;
use Cake\Utility\Text;

/**
 * Pages Controller
 *
 * @property \App\Model\Table\PagesTable $Pages
 */
class PagesController extends AppController
{
	public function add()
	{
		$page = $this->Pages->newEmptyEntity();
		$uploadError = null;

		if ($this->request->is('post')) {

			$data = $this->request->getData();
			// Exemplo de estrutura de $data esperado:
			// Array
			// (
			//   [title] => "Minha Página"
			//   [slug] => "minha-pagina"
			//   [user_id] => 1
			//   [ativo] => 1
			//   [page_blocks] => Array
			//     (
			//       [0] => Array
			//         (
			//           [type] => "texto"
			//           [content] => Array
			//             (
			//               [texto] => "Conteúdo do bloco de texto"
			//             )
			//           [user_id] => 1
			//           [ativo] => 1
			//         )
			//       [1] => Array
			//         (
			//           [type] => "imagem"
			//           [content] => Array
			//         (
			//           [file_path] => "imagem-pagina-20260605120000-abc12345.jpg"
			//           [alt_text] => "Descrição da imagem"
			//         )
			//       [user_id] => 1
			//       [ativo] => 1
			//     )
			//   )
			// )

			// Tratando o slug: se o título for fornecido, geramos um slug automaticamente
			if (!empty($data['title'])) {
				$data['slug'] = strtolower(Text::slug($data['title']));
			}

			// Definimos um usuário padrão para salvar a página e os blocos.
			// Ajuste para usar o usuário autenticado quando houver autenticação.
			$data['user_id'] = 1;
			$data['ativo'] = 1;

			foreach ($data['page_blocks'] as &$bloco) {
				$bloco['user_id'] = 1;
				$bloco['ativo'] = 1;

				if ($bloco['type'] === 'imagem' || $bloco['type'] === 'banner') {
					$arquivo = $bloco['uploaded_file'] ?? null;

					if ($arquivo instanceof UploadedFileInterface && $arquivo->getError() === \UPLOAD_ERR_OK) {
						if ($this->isValidImageUpload($arquivo)) {
							$nomeDoArquivo = $this->storeUploadedImage($arquivo);

							$bloco['content'] = [
								'file_path' => $nomeDoArquivo,
								'alt_text' => $bloco['alt_text'] ?? ''
							];
						} else {
							$uploadError = 'Apenas imagens JPG, JPEG, PNG, GIF ou WEBP sao permitidas.';
						}
					} else {
						$uploadError = 'Selecione uma imagem valida para upload.';
					}
				} else {
					// Forçamos os blocos de texto a virarem Array para a coluna JSON
					if (isset($bloco['content']) && is_string($bloco['content'])) {
						$bloco['content'] = ['texto' => $bloco['content']];
					}
				}

				// Independentemente de ser imagem ou não, ou de ter dado erro ou não,
				// nós destruímos essa chave. O banco de dados não tem a coluna "uploaded_file",
				// então se isso chegar no $this->Pages->save(), o CakePHP vai travar.
				if (isset($bloco['uploaded_file'])) {
					unset($bloco['uploaded_file']);
				}

				// Limpamos também o alt_text solto, já que o guardamos para dentro de 'content'
				if (isset($bloco['alt_text'])) {
					unset($bloco['alt_text']);
				}
			}

			$page = $this->Pages->patchEntity($page, $data);

			if ($uploadError !== null) {
				$page->setError('uploaded_file', [$uploadError]);
			}

			if ($this->Pages->save($page)) {
				$status = 'sucesso';
				$errors = [];
			} else {
				$status = 'erro ao salvar a página sobre: ' . $page->id;
				$errors = $page->getErrors();
			}
		}

		$this->set(compact('page', 'status', 'errors'));
		$this->viewBuilder()->setClassName('Json');
		$this->viewBuilder()->setOption('serialize', ['page', 'status', 'errors']);
	}

	public function index()
	{
		$pages = $this->Pages->find('all')
			->contain(['PageBlocks'])
			->orderBy(['Pages.modified' => 'DESC'])
			->all();

		$pagesList = $pages->map(function ($page) {
			return [
				'id' => $page->id,
				'title' => $page->title,
				'user_id' => $page->user_id,
				'ativo' => $page->ativo,
				'created' => $page->created->format('d/m/Y H:i'),
				'modified' => $page->modified->format('d/m/Y H:i'),
				'blocks_count' => count($page->page_blocks)
			];
		});

		$this->set(compact('pagesList'));
		$this->viewBuilder()->setClassName('Json');
		$this->viewBuilder()->setOption('serialize', ['pagesList']);
	}

	private function storeUploadedImage(UploadedFileInterface $uploadedFile): string
	{
		$targetDir = WWW_ROOT . 'img' . DS . 'pages' . DS;
		if (!is_dir($targetDir)) {
			mkdir($targetDir, 0775, true);
		}

		$clientFileName = (string)$uploadedFile->getClientFilename();
		$extension = strtolower((string)pathinfo($clientFileName, PATHINFO_EXTENSION));
		$baseName = (string)pathinfo($clientFileName, PATHINFO_FILENAME);
		$safeBaseName = strtolower(trim((string)preg_replace('/[^a-zA-Z0-9_-]+/', '-', $baseName), '-'));
		if ($safeBaseName === '') {
			$safeBaseName = 'imagem-pagina';
		}

		$fileName = $safeBaseName . '-' . date('YmdHis') . '-' . substr(sha1(uniqid('', true)), 0, 8) . '.' . $extension;
		$uploadedFile->moveTo($targetDir . $fileName);

		return $fileName;
	}

	private function isValidImageUpload(UploadedFileInterface $uploadedFile): bool
	{
		$clientFileName = (string)$uploadedFile->getClientFilename();
		$extension = strtolower((string)pathinfo($clientFileName, PATHINFO_EXTENSION));
		$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
		if (!in_array($extension, $allowedExtensions, true)) {
			return false;
		}

		$stream = $uploadedFile->getStream();
		$uri = $stream->getMetadata('uri');
		if (!is_string($uri) || $uri === '' || !is_file($uri)) {
			return false;
		}

		$imageInfo = @getimagesize($uri);
		return $imageInfo !== false;
	}
}
