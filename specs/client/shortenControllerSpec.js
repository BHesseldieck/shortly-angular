'use strict';

describe('ShortenController', function () {
  var $scope, $rootScope, $location, createController, $httpBackend, Links;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('shortly'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Links = $injector.get('Links');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('ShortenController', {
        $scope: $scope,
        Links: Links,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a link property on the $scope', function () {
    expect($scope.link).to.be.an('object');
  });

  it('should have a addLink method on the $scope', function () {
    expect($scope.addLink).to.be.a('function');
  });

  it('should be able to create new links with addLink()', function () {
    $httpBackend.expectPOST('/api/links').respond(201, '');
    $scope.link = {url: 'http://apple.com'};
    $scope.addLink();
    $httpBackend.flush();
  });

  it('should have a isValidUrl method on the $scope', function () {
    expect($scope.isValidUrl).to.be.a('function');
  });

  it('should test if the Url is valid', function () {
    $scope.link = {url: 'http://apple.com'};
    expect($scope.isValidUrl).to.be.a(true);
    $scope.link = {url: 'abcdefg'};
    expect($scope.isValidUrl).to.be.a(false);
  });
});
