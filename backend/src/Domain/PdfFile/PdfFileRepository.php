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
    public function getPdfFileFromId(int $id): ?array;

    public function addPdfFile(string $name, string $filename): bool;

    public function updatePdfFile(int $id, string $name, string $filename): bool;

    public function editPdfFileName(int $id, string $new_name): bool;

    public function rmPdfFile(int $id): bool;
}
