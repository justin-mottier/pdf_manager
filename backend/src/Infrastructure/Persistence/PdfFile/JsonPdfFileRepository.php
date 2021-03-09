<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\PdfFile;

use App\Domain\PdfFile\PdfFile;
use App\Domain\PdfFile\PdfFileNotFoundException;
use App\Domain\PdfFile\PdfFileRepository;

class JsonPdfFileRepository implements PdfFileRepository
{
    /**
     * @var array-key
     */
    private $db_header;

    /**
     * @var array
     */
    private $pdf_files;

    /**
     * JsonPdfFileRepository constructor.
     */
    public function __construct()
    {
//        $json_filepath = 'src/Infrastructure/Persistence/PdfFile/PdfFile.json';
        $json_filepath = __DIR__ . '/PdfFile.json';
        $json_content = json_decode(file_get_contents($json_filepath), true);
        $this->db_header = $json_content['header'];
        $this->pdf_files = $json_content['files'];
    }

    /**
     * {@inheritdoc}
     */
    public function getAll(): array
    {
        return array_values($this->pdf_files);
    }

    /**
     * {@inheritdoc}
     */
    public function getPdfFileFromId(int $id): PdfFile
    {
        if (!isset($this->pdf_files[$id])) {
            throw new PdfFileNotFoundException();
        }

        return $this->pdf_files[$id];
    }
}
