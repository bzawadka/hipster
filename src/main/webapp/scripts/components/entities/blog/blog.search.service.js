'use strict';

angular.module('hipsterApp')
    .factory('BlogSearch', function ($resource) {
        return $resource('api/_search/blogs/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
