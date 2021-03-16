<?php


namespace App\Application\Actions\PdfFile;


use Psr\Http\Message\ResponseInterface as Response;

class AddPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        if (count($_FILES) != 1) {
            return $this->respondWithData(['msg' => 'Incorrect file'], 400);
        }

        $encoded_name = key($_FILES);

        $file_obj = $_FILES[$encoded_name];


        if ($file_obj['error'] > 0) {
            return $this->respondWithData(['msg' => 'An unknown error occurred'], 400);
        }

        $name = urldecode($encoded_name);
        $filename = $file_obj['name'];
        $tmp_location = $file_obj['tmp_name'];

        $this->logger->info("name: $name  -  filename: $filename  -  tmp: $tmp_location");
        $storage_path = realpath($this->request->getServerParams()['DOCUMENT_ROOT'] . '/../var/pdf_files');
        $success = move_uploaded_file($tmp_location, "$storage_path/$filename");

        if (!$success) {
            $this->respondWithData(['msg' => 'An error occurred with the upload'], 400);
        }

        $this->pdf_file_repository->addPdfFile($name, $filename);
        return $this->respondWithData(['msg' => 'File successfully uploaded']);
    }
}