<?php
declare(strict_types=1);

namespace App\Application\Actions\PdfFile;

use Psr\Http\Message\ResponseInterface as Response;

class ListPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $pdf_files = $this->pdf_file_repository->getAll();

        $this->logger->info("Users list was viewed.");

        return $this->respondWithData($pdf_files);
    }
}
