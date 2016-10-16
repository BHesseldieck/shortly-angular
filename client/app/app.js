angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  // Maybe rather use ui-router, because it's the standard: https://ui-router.github.io/tutorial/ng1/helloworld
  $routeProvider
    // .when('/:url', { // Would also work instead of the if statement in run
    //   templateUrl: 'app/links/links.html',
    //   controller: 'LinksController',
    //   authenticate: true
    // })
    .when('/', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      controllerAs: 'ACtrl',
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      controllerAs: 'ACtrl',
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      controllerAs: 'ACtrl',
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      controllerAs: 'SCtrl',
      authenticate: true
    })
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      controllerAs: 'LCtrl',
      authenticate: true,
      resolve: {
        resolveData: function(Links) {
          return Links.getAll();
        }
      }
    });  
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (!next) {
      $location.path('/links');
    } else if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
