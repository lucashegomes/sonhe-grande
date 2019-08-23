(function () {
	'use strict';

	angular
		.module('SonheGrande')
		.controller('SonheGrandeCtrl', SonheGrandeCtrl)
		.controller('LeadCtrl', LeadCtrl)
		.controller('CadastroCtrl', CadastroCtrl)

	/** @ngInject */
	function SonheGrandeCtrl($scope, theme, $http) {
		var vm = this;

		init();

		function init() {
			$scope.getLayoutOption = function (key) {
				return theme.get(key);
			};

			$scope.toggleLeftBar = function () {
				theme.set('leftbarCollapsed', !theme.get('leftbarCollapsed'));
			};

			$scope.scrollbarConfig = {
				theme: 'dark',
				scrollInertia: 500,
				setHeight: 300,
				setWidth: 300,
				scrollInertia: 200,
				autoHideScrollbar: true,
				advanced: {
					updateOnContentResize: true
				},
				scrollButtons: {
					scrollAmount: 'auto',
					enable: false
				}
			}

			theme.set('fullscreen', false);
		}

	}

	function LeadCtrl($state, $rootScope, dataAPI, ModalService) {
		var vm = this;

		vm.modalLead = {};

		angular.fromJson($rootScope.Unidades).forEach(function (element, index, array) {
			if (element.Code == $state.params.unidadeID) {
				vm.unidade = element;
			}
		});

		dataAPI.post('retornaAllLeads', {}).then(function name(ret) {

			vm.Leads = [];
			var controlaLeads = [];

			vm.LeadsConfirmados = 0;
			vm.LeadsNaoConfirmados = 0;

			Object.keys(ret).map(function (objectKey, index) {
				var value = ret[objectKey];
				if (value.confirmado == 1) {
					vm.LeadsConfirmados++;
				} else {
					vm.LeadsNaoConfirmados++;
				}
				value.confirmado = value.confirmado == 1 ? 'Confirmado' : 'Aguardando';
				value.data = formatDateToString(value.data);
				controlaLeads.push(value);
			});

			controlaLeads.reverse();
			vm.Leads = controlaLeads;

			vm.LeadsConfirmadosP = vm.LeadsConfirmados / vm.Leads.length * 100;
			vm.LeadsNaoConfirmadosP = vm.LeadsNaoConfirmados / vm.Leads.length * 100;
			vm.totalLeads = vm.LeadsConfirmados + vm.LeadsNaoConfirmados;
		})

		function formatDateToString(date) {
			var dateParts = date.split("-");
			var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
			var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
			var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
			var yyyy = date.getFullYear();
			return (dd + '/' + MM + '/' + yyyy);
		}

		vm.openModal = function (id, lead) {
			console.log(lead);
			vm.modalLead = lead;
			ModalService.Open(id);
		}

		vm.closeModal = function (id) {
			ModalService.Close(id);
		}
	}

	function CadastroCtrl($state, $rootScope, dataAPI, ModalService) {
		var vm = this;

		vm.modalLead = {};

		angular.fromJson($rootScope.Unidades).forEach(function (element, index, array) {
			if (element.Code == $state.params.unidadeID) {
				vm.unidade = element;
			}
		});

		dataAPI.post('retornaAlunos', {}).then(function name(ret) {

			vm.Cadastros = [];
			var controlaCadastros = [];

			var codigosTotal = 0;
			var codigosAula = 0;
			var codigosMartricula = 0;
			var codigosRematricula = 0;
			var cadastrosAula = 0;
			var cadastrosMartricula = 0;
			var cadastrosRematricula = 0;

			Object.keys(ret).map(function (objectKey, index) {
				var value = ret[objectKey];
				value.data_cadastro = formatDateToString(value.data_cadastro);
				controlaCadastros.push(value);
				codigosTotal = parseInt(value.codigos) + codigosTotal;

				if (value.tipo_page == 'aula-experimental') {

					codigosAula = parseInt(value.codigos) + codigosAula;
					cadastrosAula++;

				} else if (value.tipo_page == 'matricula') {

					codigosMartricula = parseInt(value.codigos) + codigosMartricula;
					cadastrosMartricula++;

				} else if (value.tipo_page == 'rematricula') {

					codigosRematricula = parseInt(value.codigos) + codigosRematricula;
					cadastrosRematricula++

				}
			});

			vm.codigosTotal = codigosTotal;
			vm.codigosAula = codigosAula;
			vm.codigosMartricula = codigosMartricula;
			vm.codigosRematricula = codigosRematricula;

			vm.cadastrosTotal = controlaCadastros.length;
			vm.cadastrosAula = cadastrosAula;
			vm.cadastrosMartricula = cadastrosMartricula;
			vm.cadastrosRematricula = cadastrosRematricula;

			vm.Cadastros = controlaCadastros;

			console.log(vm.Cadastros);
		})

		function formatDateToString(date) {
			var dateParts = date.split("-");
			var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
			var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
			var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
			var yyyy = date.getFullYear();
			return (dd + '/' + MM + '/' + yyyy);
		}

		vm.openModal = function (id, lead) {
			console.log(lead);
			vm.modalLead = lead;
			ModalService.Open(id);
		}

		vm.openModalCadastro = function (id, cadastro) {
			console.log(cadastro);
			dataAPI.post('meusNumeros', cadastro).then(function name(ret) {
				console.log(ret);
				vm.modalCadastro = ret;
			});
			ModalService.Open(id);
		}

		vm.closeModal = function (id) {
			vm.modalCadastro = {};
			ModalService.Close(id);
		}
	}

}());