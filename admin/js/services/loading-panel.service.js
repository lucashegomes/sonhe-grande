(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .service('LoadingPanelService', LoadingPanelService)

    /** @ngInject */
    function LoadingPanelService() {

        const service = {
            start: start,
            stop: stop
        };

        return service;

        function start(element, small) {
            var widget = $(element).closest('[data-widget]');
            var cssClass = 'panel-loading' + ((small) ? ' small' : '');
            widget.append('<div class="' + cssClass + '"><div class="panel-loader-circular-img"><img class="img-responsive" src="images/progress/progress-circle-complete.svg" alt="" /></div></div>');
        }

        function stop(element) {
            var widget = $(element).closest('[data-widget]');
            widget.find('.panel-loading').remove();
        }
    }
}());