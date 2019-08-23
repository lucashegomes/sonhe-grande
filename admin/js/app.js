(function () {
	'use strict';

	angular
		.module('SonheGrande', ["ngMessages", 'oitozero.ngSweetAlert', 'ui.bootstrap', "ui.router", "ngScrollbars", 'smart-table', "ngSanitize", "ngCookies", "angular-svg-round-progressbar", "angular.morris"])
		.config(config)

	/** @ngInject */
	function config(ScrollBarsProvider) {
		ScrollBarsProvider.defaults = {
			autoHideScrollbar: false,
			setHeight: 100,
			scrollInertia: 200,
			axis: 'yx',
			advanced: {
				updateOnContentResize: true
			},
			scrollButtons: {
				scrollAmount: 'auto', // scroll amount when button pressed
				enable: true // enable scrolling buttons by default
			}
		};
	}

}());