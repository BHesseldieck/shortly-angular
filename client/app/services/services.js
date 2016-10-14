angular.module('shortly.services', [])

.factory('Links', function ($http) {
  // Simple GET request example:
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      return response;
    });
  };

  var addOne = function(urlObj) {
    return $http({
      method: 'POST',
      url: '/api/links',
      data: JSON.stringify(urlObj)
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      return response;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      return response;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
