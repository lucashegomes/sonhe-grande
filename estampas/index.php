<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ob_start('ob_gzhandler');

if (!session_start()) {
    session_start();
}

define('WWW_ROOT', $_SERVER["DOCUMENT_ROOT"] . '/api');
define('DS', DIRECTORY_SEPARATOR);

require_once WWW_ROOT . DS . 'autoload.php';

switch ($_SERVER["SERVER_NAME"]) {

    case 'www-dev.microlinssonhegrande.com.br':
        Lib\RedBean\R::setup('mysql:host=192.168.15.150;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    case 'www-n.microlinssonhegrande.com.br':
        Lib\RedBean\R::setup('mysql:host=mmserver.com.br;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    case 'microlinssonhegrande.mmserver.com.br':
        Lib\RedBean\R::setup('mysql:host=localhost;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    default:
        Lib\RedBean\R::setup('mysql:host=localhost;dbname=microlins_sonhegrande', 'marketmedia', 'Mm1720Server');
        break;
}

$router = new Lib\Router\Router();

$router->set404(function () {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
});

$router->get('/([a-z0-9A-Z_-]+)', function ($aluno) {
    require_once 'controller/Estampa.php';
});

$router->run();

// /blog((((/[a-z0-9_-]+)?)?)?)?
