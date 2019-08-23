(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .service('LeadService', LeadService)

    /** @ngInject */
    function LeadService($http, $rootScope) {
        var LeadService = {
            getLeads: getLeads,
            updateLead: updateLead
        };

        return LeadService;

        function getLeads() {
            return $http.get('../api/listarLeads', {
                params: {
                    unidadeId: $rootScope.globals.currentUser.unidadeid
                }
            });
        }

        function updateLead(Lead) {
            return $http.get('../api/alterarLead', {
                params: {
                    situacao: Lead.situacao,
                    id: Lead.id,
                    status: Lead.status,
                    comentario: Lead.comentario,
                    data: Lead.data,
                    hora: Lead.hora,
                }
            });
        }
    }

}());