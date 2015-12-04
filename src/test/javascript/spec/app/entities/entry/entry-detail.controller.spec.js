'use strict';

describe('Entry Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockEntry, MockBlog;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockEntry = jasmine.createSpy('MockEntry');
        MockBlog = jasmine.createSpy('MockBlog');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Entry': MockEntry,
            'Blog': MockBlog
        };
        createController = function() {
            $injector.get('$controller')("EntryDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'hipsterApp:entryUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
