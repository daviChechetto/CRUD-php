<?php

declare(strict_types=1);

namespace App\Controller;

use Psr\Http\Message\UploadedFileInterface;

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

			foreach ($data['page_blocks'] as &$bloco) {

				if ($bloco['tipo'] === 'imagem') {
					$arquivo = $bloco['uploaded_file'] ?? null;

					if ($arquivo instanceof UploadedFileInterface && $arquivo->getError() === \UPLOAD_ERR_OK) {
						if ($this->isValidImageUpload($arquivo)) {
							$nomeDoArquivo = $this->storeUploadedImage($arquivo);

							$bloco['conteudo'] = [
								'file_path' => $nomeDoArquivo,
								'alt_text' => $bloco['alt_text'] ?? ''
							];
						} else {
							$uploadError = 'Apenas imagens JPG, JPEG, PNG, GIF ou WEBP sao permitidas.';
						}
					} else {
						$uploadError = 'Selecione uma imagem valida para upload.';
					}
				}

				// Independentemente de ser imagem ou não, ou de ter dado erro ou não,
                // nós destruímos essa chave. O banco de dados não tem a coluna "uploaded_file",
                // então se isso chegar no $this->Pages->save(), o CakePHP vai travar.
                if (isset($bloco['uploaded_file'])) {
                    unset($bloco['uploaded_file']);
                }
                
                // Limpamos também o alt_text solto, já que o guardamos para dentro de 'conteudo'
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
			} else {
				$status = 'erro ao salvar a página sobre: ' . $page->id;
			}
		}

		$this->set(compact('page', 'status'));
		$this->viewBuilder()->setClassName('Json');
		$this->viewBuilder()->setOption('serialize', ['page', 'status']);
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
