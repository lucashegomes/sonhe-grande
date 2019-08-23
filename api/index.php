<?php

define('TIMEZONE', 'America/Sao_Paulo');
date_default_timezone_set(TIMEZONE);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start('ob_gzhandler');

if (!session_start()) {
    session_start();
}

define('WWW_ROOT', dirname(__FILE__));
define('DS', DIRECTORY_SEPARATOR);
define('URL_SITE', 'http://' . $_SERVER["SERVER_NAME"]);

require_once WWW_ROOT . DS . 'autoload.php';

switch ($_SERVER["SERVER_NAME"]) {

    case 'www-dev.sonhegrande2018.com.br':
        Lib\RedBean\R::setup('mysql:host=192.168.15.150;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    case 'www-n.sonhegrande2018.com.br':
        Lib\RedBean\R::setup('mysql:host=mmserver.com.br;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    case 'sonhegrande2018.mmserver.com.br':
        Lib\RedBean\R::setup('mysql:host=localhost;dbname=microlins_sonhegrande', 'marketmedia', 'mark321x');
        break;

    default:
        Lib\RedBean\R::setup('mysql:host=localhost;dbname=microlins_sonhegrande', 'marketmedia', 'Mm1720Server');
        break;
}

$router = new Lib\Router\Router();

$router->set404(function () {
    echo "erro";
    die;
});

$router->post('cadastrar-lead', function () {
    require_once ('Controllers/CadastrarLead.php');
});

$router->post('verifica-cpf', function () {
    require_once ('Controllers/VerificaCpf.php');
});

$router->post('upload-profile', function () {
    require_once ('Controllers/UploadProfile.php');
});

$router->post('upload-estampa', function () {
    require_once ('Controllers/UploadEstampa.php');
});

$router->post('listar-estampas', function () {
    require_once ('Controllers/ListarEstampas.php');
});

$router->post('minha-conta', function () {
    require_once ('Controllers/MinhaConta.php');
});

$router->post('estampas-mais-votadas', function () {
    require_once ('Controllers/EstampasVotadas.php');
});

$router->post('cadastrar-estampa', function () {
    require_once ('Controllers/CadastrarEstampa.php');
});

$router->post('login', function () {
    require_once ('Controllers/Login.php');
});

$router->post('redefinir-senha', function () {
    require_once ('Controllers/RedefinirSenha.php');
});

$router->post('votar', function () {
    require_once ('Controllers/Votar.php');
});

$router->post('votar-interno', function () {
    require_once ('Controllers/VotarInterno.php');
});

$router->post('login-admin', function () {
    require_once ('Controllers/LoginAdmin.php');
});

$router->post('retorna-estampas', function () {
    require_once ('Controllers/RetornaEstampas.php');
});

$router->post('retorna-cadastro', function () {
    require_once ('Controllers/RetornaCadastro.php');
});

$router->post('aprovar-estampa', function () {
    require_once ('Controllers/AprovarEstampa.php');
});

$router->post('atualiza-pic-profile', function () {
    require_once ('Controllers/AtualizaPicProfile.php');
});

$router->run();
