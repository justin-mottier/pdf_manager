<?php
declare(strict_types=1);

namespace App\Domain\PdfFile;

use App\Domain\DomainException\DomainRecordNotFoundException;

class PdfFileNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The pdf file you requested does not exist.';
}
