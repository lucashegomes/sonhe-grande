angular.module("SonheGrande").directive("uiSpinner", ['$rootScope', function ($rootScope) {
	return {
		link: function (scope, element, attrs) {
			var opts = {
				lines: 17 // The number of lines to draw
					,
				length: 4 // The length of each line
					,
				width: 6 // The line thickness
					,
				radius: 20 // The radius of the inner circle
					,
				scale: 1.25 // Scales overall size of the spinner
					,
				corners: 1 // Corner roundness (0..1)
					,
				color: '#546e7a' // #rgb or #rrggbb or array of colors
					,
				opacity: 0.1 // Opacity of the lines
					,
				rotate: 0 // The rotation offset
					,
				direction: 1 // 1: clockwise, -1: counterclockwise
					,
				speed: 1.5 // Rounds per second
					,
				trail: 38 // Afterglow percentage
					,
				fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
					,
				zIndex: 2e9 // The z-index (defaults to 2000000000)
					,
				className: 'spinner' // The CSS class to assign to the spinner
					,
				top: '50%' // Top position relative to parent
					,
				left: '50%' // Left position relative to parent
					,
				shadow: false // Whether to render a shadow
					,
				hwaccel: false // Whether to use hardware acceleration
					,
				position: 'fixed' // Element positioning
			}
			var target = document.getElementById('foo')
			var spinner = new Spinner(opts).spin(target);

			scope.$on('$stateChangeStart', function () {
				element.removeClass('hide')
			});
			scope.$on('$stateChangeSuccess', function () {
				element.addClass('hide');
				if (window.scrollY) {
					window.scroll(0, 0);
				}
			});
		}
	};
}]);