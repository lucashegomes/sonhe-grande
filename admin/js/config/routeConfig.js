angular.module("SonheGrande").config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/inicio");

		$stateProvider

			.state('login', {
				url: '/login',
				cache: false,
				views: {
					'@': {
						controller: 'loginCtrl',
						templateUrl: 'view/login.html'
					}
				},
				authStatus: false
			})

			.state('inicio', {
				url: '/inicio',
				cache: false,
				views: {
					'@': {
						controller: 'inicioCtrl',
						controllerAs: 'vm',
						templateUrl: 'view/templates/conteudo.html',
					},
					'sideBar@inicio': {
						templateUrl: 'view/layout/sidebar.html'
					},
					'header@inicio': {
						templateUrl: 'view/layout/header.html'
					},
					'content@inicio': {
						templateUrl: 'view/inicio.html'
					}
				},
				authStatus: true
			})

	})

	.run(function ($rootScope, $location, dataAPI, $cookieStore, $http, $cookies) {
		$rootScope.authStatus = false;
		$rootScope.globals = $cookieStore.get('globals') || {};

		$rootScope.$on("$stateChangeStart", function (event, next, current) {
			$rootScope.authStatus = next.authStatus;

			if (next.authStatus && !$rootScope.globals.currentUser) {
				$location.path('/login');
				return;
			}
		});
	});