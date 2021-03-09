<?php
declare(strict_types=1);

namespace App\Application\Actions\PdfFile;

use App\Application\Actions\Action;
use App\Domain\PdfFile\PdfFileRepository;
use Psr\Log\LoggerInterface;

abstract class PdfFileAction extends Action
{
    /**
     * @var PdfFileRepository
     */
    protected $pdf_file_repository;

    /**
     * @param LoggerInterface $logger
     * @param PdfFileRepository $pdf_file_repository
     */
    public function __construct(LoggerInterface $logger, PdfFileRepository $pdf_file_repository) {
        parent::__construct($logger);
        $this->pdf_file_repository = $pdf_file_repository;
    }
}
