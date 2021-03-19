<?php


namespace App\Application\Actions\PdfFile;


use Psr\Http\Message\ResponseInterface as Response;

class RmPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $id = $this->resolveArg('id');
        $storage_path = realpath($this->request->getServerParams()['DOCUMENT_ROOT'] . '/../var/pdf_files');
        $file_path = $storage_path . '/' . $this->pdf_file_repository->getPdfFileFromId($id)['filename'];
        if (file_exists($file_path)) {
            unlink($storage_path . '/' . $this->pdf_file_repository->getPdfFileFromId($id)['filename']);
        }
        $this->logger->info('rm in db: ' . $this->pdf_file_repository->rmPdfFile($id));
        return $this->respondWithData(['msg' => 'File successfully removed']);
    }
}