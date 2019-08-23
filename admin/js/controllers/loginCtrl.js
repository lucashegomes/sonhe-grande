angular.module("SonheGrande").controller("loginCtrl", function ($scope, SweetAlert, LoadingPanelService, theme, $location, $rootScope, $cookies, $cookieStore, dataAPI, AuthenticationService) {
	theme.set('fullscreen', true);

	AuthenticationService.ClearCredentials();

	$scope.login = function () {
		LoadingPanelService.start(document.querySelector('.panelLoading'));

		AuthenticationService
			.Login($scope.username, $scope.password, function (response) {
				LoadingPanelService.stop(document.querySelector('.panelLoading'));

				if (response.data) {
					AuthenticationService.SetCredentials($scope.username, $scope.password, response.data.nome, response.data.unidade, response.data.usuarioid);
					theme.set('fullscreen', false);
					$location.path('/inicio');
				} else {
					SweetAlert.swal("Ops, Usuário ou Senha inválidos!", "Por favor, Tente novamente!", "error");
					$scope.error = response.message;
					$scope.dataLoading = false;
				}
			});
	};
});