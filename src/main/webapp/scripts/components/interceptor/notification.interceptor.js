 'use strict';

angular.module('hipsterApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-hipsterApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-hipsterApp-params')});
                }
                return response;
            }
        };
    });
