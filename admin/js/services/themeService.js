angular.module("SonheGrande").service("theme", function ($rootScope) {
	this.settings = {
		fullscreen: false,
		leftbarCollapsed: false
	};

	this.get = function (key) {
		return this.settings[key];
	};

	this.set = function (key, value) {
		this.settings[key] = value;
	};
});