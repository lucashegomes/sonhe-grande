<?php

if ((strpos($_SERVER['HTTP_HOST'], 'www.') === false) && $_SERVER["SERVER_NAME"] == 'sonhegrandemicrolins.com.br') {
    header('Location: https://www.' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}

require_once 'config/config.php';

$config = new Config();
$config->verificaMidia();

$versao = '1.0.4';

?>
<!DOCTYPE html>
<html lang="pt-BR" ng-app="SonheGrande">

<head>

	<meta property="fb:app_id" content="1566475350056781" />
    <meta property="og:locale" content="pt_BR">
	<meta property="og:title" content="Promoção Sonhe Grande - Microlins!">
	<meta property="og:description" content="">
	<meta property="og:site_name" content="Promoção Sonhe Grande - Microlins">
    <meta property="og:url" content="https://www.sonhegrandemicrolins.com.br">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image" content="https://www.sonhegrandemicrolins.com.br/app/images/banner-to-share.png">
	<meta property="og:image:width" content="620">
	<meta property="og:image:height" content="364">
	<meta property="og:type" content="website">
	<meta name="author" content="#Sonhe Grande">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <base href="/">
    <title>Microlins</title>
    <link href="https://fonts.googleapis.com/css?family=Exo+2:200,300,400,400i,500,600,700,800,900,900i" rel="stylesheet">
    <link rel="stylesheet" href="app/css/main.css?v=<?php echo $versao; ?>">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="lib/themify-icons/themify-icons.css">
    <link rel="stylesheet" href="lib/animate.css/animate.css">
    <link rel="stylesheet" href="lib/sweet-alert/sweet-alert.css">
    <link rel="stylesheet" href="lib/owl-carousel/owl.carousel.css">
    <link rel="stylesheet" href="lib/owl-carousel/owl.theme.css">
    <link rel="stylesheet" href="lib/select2/select.min.css">
    <link rel="stylesheet" href="lib/select2/select2.css">
    <link rel="stylesheet" href="lib/bootstrap4/css.css">

</head>

<body ng-controller="SonheGrandeCtrl" data-versao="<?php echo $versao; ?>" ng-class="regulamento?'body-regulamento':''">

    <ui-view></ui-view>

    <script src="lib/modernizr/modernizr.js"></script>
    <script src="lib/jquery/jquery-3.2.1.min.js"></script>
    <script src="lib/bootstrap4/bootstrap.min.js"></script>
    <script src="lib/angular/angular.js"></script>
    <script src="https://code.angularjs.org/1.5.9/i18n/angular-locale_pt-br.js"></script>
    <script src="lib/angular-ui-router/angular-ui-router.js"></script>
    <script src="lib/angular-file-upload/dist/angular-file-upload.min.js"></script>
    <script src="lib/angular/angular-messages.js"></script>
    <script src="lib/angular/angular-cookies.js"></script>
    <script src="lib/ngFacebook/ngFacebook.js"></script>
    <script src="lib/angular-sanitize/angular-sanitize.js"></script>
    <script src="lib/ui-bootstrap/teste.js"></script>
    <script src="lib/spin/spin.min.js"></script>
    <script src="lib/roundProgress/roundProgress.js"></script>
    <script src="lib/morris/angular-morris.js"></script>
    <script src="lib/sweet-alert/sweet-alert.min.js"></script>
    <script src="lib/sweet-alert/SweetAlert.js"></script>
    <script src="lib/owl-carousel/owl.carousel.js"></script>
    <script src="lib/select2/select.min.js"></script>
    <script src="lib/ngStorage/ngStorage.js"></script>
    <script src="lib/ngmask/ngMask.min.js"></script>
    <script src="lib/ng-map/ng-map.min.js"></script>
    <script src="lib/xml2json/angular-xml2json.js"></script>

    <script src="app/js/app.js?v=<?php echo $versao; ?>"></script>
    <script src="app/js/config/routeConfig.js?v=<?php echo $versao; ?>"></script>
    <script src="app/js/directives/directives.js?v=<?php echo $versao; ?>"></script>
    <script src="app/js/services/services.js?v=<?php echo $versao; ?>"></script>
    <script src="app/js/filters/filters.js?v=<?php echo $versao; ?>"></script>
    <script src="app/js/controllers/controllers.js?v=<?php echo $versao; ?>"></script>

</body>

</html>