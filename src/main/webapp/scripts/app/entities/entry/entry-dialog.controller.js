'use strict';

angular.module('hipsterApp').controller('EntryDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Entry', 'Blog',
        function($scope, $stateParams, $modalInstance, entity, Entry, Blog) {

        $scope.entry = entity;
        $scope.blogs = Blog.query();
        $scope.load = function(id) {
            Entry.get({id : id}, function(result) {
                $scope.entry = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('hipsterApp:entryUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.entry.id != null) {
                Entry.update($scope.entry, onSaveSuccess, onSaveError);
            } else {
                Entry.save($scope.entry, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
