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
     * @var string
     */
    private $json_filepath = __DIR__ . '/PdfFile.json';
    /**
     * JsonPdfFileRepository constructor.
     */
    public function __construct()
    {
        $json_content = json_decode(file_get_contents($this->json_filepath), true);
        $this->db_header = $json_content['header'];
        $this->pdf_files = $json_content['files'];
    }

    private function writeJson()
    {
        $deserialized_json = [
            'header' => $this->db_header,
            'files' => $this->pdf_files
        ];
        $write_result = file_put_contents($this->json_filepath, json_encode($deserialized_json));
        return $write_result !== false;
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
    public function getPdfFileFromId(int $id): ?array
    {
        foreach ($this->pdf_files as $file) {
            if ($file['id'] == $id) {
                return $file;
            }
        }

        return null;
    }

    public function addPdfFile(string $name, string $filename): bool
    {
        $new_id = ++$this->db_header['base_id'];
        $this->pdf_files[$new_id] = [
            'id' => $new_id,
            'name' => $name,
            'filename' => $filename
        ];
        return $this->writeJson();
    }

    public function updatePdfFile(int $id, string $name, string $filename): bool
    {
        return true;
    }

    public function editPdfFileName(int $id, string $new_name): bool
    {
        if (!key_exists($id, $this->pdf_files)) {
            return false;
        }
        $this->pdf_files[$id]['name'] = $new_name;
        $this->writeJson();
        return true;
    }

    public function rmPdfFile(int $id): bool
    {
        if (!key_exists($id, $this->pdf_files)) {
            return false;
        }
        unset($this->pdf_files[$id]);
        $this->writeJson();
        return true;
    }
}
