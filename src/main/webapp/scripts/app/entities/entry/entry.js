'use strict';

angular.module('hipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('entry', {
                parent: 'entity',
                url: '/entrys',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Entrys'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/entry/entrys.html',
                        controller: 'EntryController'
                    }
                },
                resolve: {
                }
            })
            .state('entry.detail', {
                parent: 'entity',
                url: '/entry/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Entry'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/entry/entry-detail.html',
                        controller: 'EntryDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Entry', function($stateParams, Entry) {
                        return Entry.get({id : $stateParams.id});
                    }]
                }
            })
            .state('entry.new', {
                parent: 'entry',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/entry/entry-dialog.html',
                        controller: 'EntryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    content: null,
                                    date: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('entry', null, { reload: true });
                    }, function() {
                        $state.go('entry');
                    })
                }]
            })
            .state('entry.edit', {
                parent: 'entry',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/entry/entry-dialog.html',
                        controller: 'EntryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Entry', function(Entry) {
                                return Entry.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('entry', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('entry.delete', {
                parent: 'entry',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/entry/entry-delete-dialog.html',
                        controller: 'EntryDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Entry', function(Entry) {
                                return Entry.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('entry', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
