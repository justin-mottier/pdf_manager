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
        foreach ($this->args as $key => $value) {
            $this->logger->info("$key => $value");
        }

        $this->logger->info(json_encode($this->request->getParsedBody()));

        return $this->respondWithData(['hello' => 'oui']);
    }
}