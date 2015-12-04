'use strict';

angular.module('hipsterApp')
    .controller('BlogDetailController', function ($scope, $rootScope, $stateParams, entity, Blog, User) {
        $scope.blog = entity;
        $scope.load = function (id) {
            Blog.get({id: id}, function(result) {
                $scope.blog = result;
            });
        };
        var unsubscribe = $rootScope.$on('hipsterApp:blogUpdate', function(event, result) {
            $scope.blog = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
