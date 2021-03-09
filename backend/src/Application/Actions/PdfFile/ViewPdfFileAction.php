<?php
declare(strict_types=1);

namespace App\Application\Actions\PdfFile;

use Psr\Http\Message\ResponseInterface as Response;

class ViewPdfFileAction extends PdfFileAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $pdf_file_id = (int) $this->resolveArg('id');
        $pdf_file = $this->pdf_file_repository->getPdfFileFromId($pdf_file_id);

        $this->logger->info("PdfFile of id `${pdf_file_id}` was viewed.");

        return $this->respondWithData($pdf_file);
    }
}
