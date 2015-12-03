'use strict';

angular.module('hipsterApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


