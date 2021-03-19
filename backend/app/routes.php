<?php
declare(strict_types=1);

use App\Application\Actions\PdfFile\ListPdfFileAction;
use App\Application\Actions\PdfFile\ViewPdfFileAction;
use App\Application\Actions\PdfFile\AddPdfFileAction;
use \App\Application\Actions\PdfFile\EditPdfFileAction;
use \App\Application\Actions\PdfFile\RmPdfFileAction;
use \App\Application\Actions\PdfFile\ReadPdfFileAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->group('/pdf-file', function (Group $group) {
       $group->get('/all', ListPdfFileAction::class);
       $group->get('/{id}', ViewPdfFileAction::class);
       $group->post('/add', AddPdfFileAction::class);
       $group->put('/{id}/{name}', EditPdfFileAction::class);
       $group->delete('/{id}', RmPdfFileAction::class);
       $group->get('/read/{id}', ReadPdfFileAction::class);
    });
};
