<?php


namespace App\Application\Actions\PdfFile;


use Psr\Http\Message\ResponseInterface as Response;

class ReadPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $id = $this->resolveArg('id');
        $file = $this->pdf_file_repository->getPdfFileFromId($id);

        $storage_path = realpath($this->request->getServerParams()['DOCUMENT_ROOT'] . '/../var/pdf_files');
        $file_path = $storage_path . '/' . $file['filename'];

        $file_content = file_get_contents($file_path);
        $this->response->getBody()->write($file_content);
        return $this->response->withHeader('Content-Type', 'application/pdf');
    }
}