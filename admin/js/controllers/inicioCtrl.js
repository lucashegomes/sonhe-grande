(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .controller('inicioCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($state, $rootScope, dataAPI, SweetAlert, ModalService, $sce) {
        var vm = this;

        vm.limit = 20;

        var cad = {};
        cad.limit = 0;

        dataAPI.post('retorna-estampas', cad).then(function name(ret) {
            vm.Estampas = [];
            var controlaLeads = [];

            vm.EstampasAprovadas = 0;
            vm.EstampasNaoAprovadas = 0;
            vm.EstampasAguardando = 0;

            Object.keys(ret).map(function (objectKey, index) {
                var value = ret[objectKey];

                if (value.aprovada == 0) {
                    value.nstatus = 'Aguardando'
                    vm.EstampasAguardando++;
                } else if (value.aprovada == 1) {
                    value.nstatus = 'Aprovada';
                    vm.EstampasAprovadas++;
                } else if (value.aprovada == 2) {
                    value.nstatus = 'Reprovada';
                    vm.EstampasNaoAprovadas++;
                }

                value.data_cadastro != undefined ? formatDateToString(value.data_cadastro) : null;
                controlaLeads.push(value);
            });
            controlaLeads.reverse();
            vm.Estampas = controlaLeads;

            vm.totalLeads = vm.EstampasAprovadas + vm.EstampasNaoAprovadas + vm.EstampasAguardando;

            vm.EstampasAprovadas = vm.EstampasAprovadas / vm.Estampas.length * 100;
            vm.EstampasNaoAprovadas = vm.EstampasNaoAprovadas / vm.Estampas.length * 100;
            vm.EstampasAguardando = vm.EstampasAguardando / vm.Estampas.length * 100;
        })

        function compare(a, b) {
            return a + b;
        }

        function formatDateToString(date) {
            if (date != undefined) {

                var dateParts = date.split("-");
                var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
                var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
                var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
                var yyyy = date.getFullYear();
                return (dd + '/' + MM + '/' + yyyy);
            }
        }

        vm.confirma = function (Lead) {

            Lead.status = 1;

            SweetAlert.swal({
                    title: "Aprovar Estampa",
                    text: "Você deseja aprovar a estampa deste aluno?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3b9c00",
                    confirmButtonText: "Sim, aprovar!",
                    ancelButtonText: "Cancelar",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        dataAPI.post('aprovar-estampa', Lead).then(function name(ret) {
                            Lead.nstatus = 'Aprovada';
                            Lead.status = 1;
                            Lead.aprovada = 1;
                            SweetAlert.swal("Aprovada!", "Estampa aprovada com sucesso!", "success");
                            $state.reload();
                        })
                    }
                });
        }

        vm.reprovar = function (Lead) {

            Lead.status = 2;

            SweetAlert.swal({
                    title: "Reprovar Estampa",
                    text: "Você deseja reprovar a estampa deste aluno?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d43f3a",
                    confirmButtonText: "Sim, reprovar!",
                    ancelButtonText: "Cancelar",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        dataAPI.post('aprovar-estampa', Lead).then(function name(ret) {
                            Lead.nstatus = 'Reprovada';
                            Lead.status = 2;
                            Lead.aprovada = 2;
                            SweetAlert.swal("Reprovada!", "Estampa reprovada com sucesso!", "success");
                            $state.reload();
                        })
                    }
                });
        }

        vm.openModalCadastro = function (id, cadastro) {
            console.log(cadastro);
            dataAPI.post('retorna-cadastro', cadastro).then(function name(ret) {
                vm.modalCadastro = ret;
                vm.modalEstampa = cadastro;
                vm.estampaURL = "../uploads/estampas/" + vm.modalEstampa.image;
            });
            ModalService.Open(id);
        }

        vm.closeModal = function (id) {
            vm.modalCadastro = {};
            vm.modalEstampa = {};
            vm.estampaURL = '';
            ModalService.Close(id);
            var myEstampa = document.getElementById("estampa");
            myEstampa != undefined ? myEstampa.pause() : null;
        }

    }
}());

(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .controller('ModalController', ModalController);

    /** @ngInject */
    function ModalController($scope, $uibModalInstance, items, LeadService) {
        var vm = this;

        vm.Lead = items;
        console.log("ENTROU AQUI");
        console.log(items);

        vm.updateLead = function () {
            vm.Lead.data = formatDateToString(vm.Lead.data);
            LeadService
                .updateLead(vm.Lead)
                .then(
                    function (success) {
                        console.log(success);
                        vm.Lead = success.data.lead;

                        $uibModalInstance.close(vm.Lead);
                    },
                    function () {}

                );
        }

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        var hoje = new Date();
        var limite = new Date(new Date(hoje).setMonth(hoje.getMonth() + 2));
        var today = new Date();

        vm.Lead.data = today;
        vm.horario = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, 0, 0);

        vm.dateOptions = {
            minDate: hoje,
            maxDate: limite,
            maxMode: 'day',
            showWeeks: false,
            yearRows: 0,
            yearColumns: 0,
            dateDisabled: myDisabledDates
        };

        function myDisabledDates(dateAndMode) {
            return (dateAndMode.mode === 'day' && (dateAndMode.date.getDay() === 0 || dateAndMode.date.getDay() === 6));
        }

        function formatDateToString(date) {
            var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            var yyyy = date.getFullYear();
            return (dd + '-' + MM + '-' + yyyy);
        }
    }
}());