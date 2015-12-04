'use strict';

angular.module('hipsterApp').controller('BlogDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Blog', 'User',
        function($scope, $stateParams, $modalInstance, entity, Blog, User) {

        $scope.blog = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            Blog.get({id : id}, function(result) {
                $scope.blog = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('hipsterApp:blogUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.blog.id != null) {
                Blog.update($scope.blog, onSaveSuccess, onSaveError);
            } else {
                Blog.save($scope.blog, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
