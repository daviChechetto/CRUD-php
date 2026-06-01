<?php

declare(strict_types=1);

namespace App\Controller\Trait;

use Psr\Http\Message\UploadedFileInterface;
use Cake\Utility\Text;

/**
 * Trait FileUploadTrait
 * 
 * Provides common file upload handling methods for controllers
 */
trait FileUploadTrait
{
    /**
     * Get the ID of the currently logged-in user
     *
     * @return int|null
     */
    protected function getLoggedUserId(): ?int
    {
        $identity = $this->request->getAttribute('identity');
        if ($identity === null) {
            return null;
        }

        $identifier = null;
        if (method_exists($identity, 'getIdentifier')) {
            $identifier = $identity->getIdentifier();
        } elseif (method_exists($identity, 'get')) {
            $identifier = $identity->get('id');
        } elseif (is_object($identity) && isset($identity->id)) {
            $identifier = $identity->id;
        } elseif (is_array($identity) && isset($identity['id'])) {
            $identifier = $identity['id'];
        }

        if ($identifier === null || $identifier === '') {
            return null;
        }

        return (int)$identifier;
    }

    /**
     * Check if uploaded file is a valid PDF
     *
     * @param \Psr\Http\Message\UploadedFileInterface $uploadedFile
     * @return bool
     */
    protected function isPdfUpload(UploadedFileInterface $uploadedFile): bool
    {
        $clientFileName = (string)$uploadedFile->getClientFilename();
        $extension = strtolower((string)pathinfo($clientFileName, PATHINFO_EXTENSION));

        return $extension === 'pdf';
    }

    /**
     * Store an uploaded PDF document
     *
     * @param \Psr\Http\Message\UploadedFileInterface $uploadedFile
     * @param string $uploadType The type/directory name (e.g., 'documentos', 'acordaos')
     * @return string The relative path to the stored file
     */
    protected function storeUploadedDocument(UploadedFileInterface $uploadedFile, string $uploadType): string
    {

        $typeName = $uploadType ?? 'documentos';

        // "Slugifica" o nome da pasta para evitar espaços e acentos
        $safeTypeName = strtolower(Text::slug($typeName, '-'));

        $uploadDir = WWW_ROOT . 'file' . DS . $safeTypeName . DS;
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0775, true);
        }

        $clientFileName = (string)$uploadedFile->getClientFilename();
        $baseName = pathinfo($clientFileName, PATHINFO_FILENAME);
        $safeBaseName = strtolower(trim((string)preg_replace('/[^a-zA-Z0-9_-]+/', '-', $baseName), '-'));
        if ($safeBaseName === '') {
            $safeBaseName = $uploadType;
        }

        $fileName = date('YmdHis') . '-' . substr(sha1(uniqid('', true)), 0, 8) . '.pdf';
        $storedFileName = $safeBaseName . '-' . $fileName;

        $uploadedFile->moveTo($uploadDir . $storedFileName);

        // Store only the filename in the database. The file is physically
        // stored under webroot/file/<safeTypeName>/<storedFileName>.
        return $storedFileName;
    }

    /**
     * Get error message for upload error codes
     *
     * @param int $errorCode
     * @return string
     */
    protected function uploadErrorMessage(int $errorCode): string
    {
        return match ($errorCode) {
            UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'O arquivo enviado excede o tamanho permitido pelo servidor.',
            UPLOAD_ERR_PARTIAL => 'O upload do arquivo foi interrompido. Tente enviar novamente.',
            UPLOAD_ERR_NO_TMP_DIR => 'O servidor não encontrou a pasta temporária de upload.',
            UPLOAD_ERR_CANT_WRITE => 'O servidor não conseguiu gravar o arquivo enviado.',
            UPLOAD_ERR_EXTENSION => 'Uma extensão do PHP bloqueou o upload do arquivo.',
            default => 'Falha no upload do arquivo. Código: ' . $errorCode,
        };
    }
}
