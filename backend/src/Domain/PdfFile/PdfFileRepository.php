<?php
declare(strict_types=1);

namespace App\Domain\PdfFile;

interface PdfFileRepository
{
    /**
     * @return PdfFile[]
     */
    public function getAll(): array;

    /**
     * @param int $id
     * @return PdfFile
     * @throws PdfFileNotFoundException
     */
    public function getPdfFileFromId(int $id): PdfFile;
}
