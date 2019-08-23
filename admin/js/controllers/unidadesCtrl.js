(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .controller('unidadesCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($rootScope) {
        var vm = this;
        vm.unidades = angular.fromJson($rootScope.Unidades);
    }
}());