<?php


namespace App\Application\Actions\PdfFile;


use Psr\Http\Message\ResponseInterface as Response;

class EditPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $id = $this->resolveArg('id');
        $new_name = $this->resolveArg('name');
        $this->pdf_file_repository->editPdfFileName($id, $new_name);
        return $this->respondWithData(['msg' => 'File successfully edited']);
    }
}