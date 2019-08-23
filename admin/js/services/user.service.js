(function () {
    'use strict';

    angular
        .module('SonheGrande')
        .service('UserService', UserService)

    /** @ngInject */
    function UserService($cookies, $rootScope) {
        var UserService = {
            setUser: setUser,
            getUser: getUser
        };

        return UserService;

        function setUser(User) {
            $cookies.putObject('User', User);
        }

        function getUser() {
            var user = $cookies.get('User') || '';

            console.log($rootScope.User);

            // if (!user) {
            //     $cookies.set('User', '');
            //     $location.path('/');
            // } else {
            //     return user;
            // }
        }
    }

}());