<?php
declare(strict_types=1);

namespace App\Domain\PdfFile;

use JsonSerializable;

class PdfFile implements JsonSerializable
{
    /**
     * @var int|null
     */
    public $id;

    /**
     * @var string
     */
    public $name;

    /**
     * @var string
     */
    public $filename;

    /**
     * @param int|null  $id
     * @param string    $name
     * @param string    $filename
     */
    public function __construct(?int $id, string $name, string $filename)
    {
        $this->id = $id;
        $this->name = $name;
        $this->filename = $filename;
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'filename' => $this->filename,
        ];
    }
}
