angular.module('shortly.links', [])

.controller('LinksController', function (Links, resolveData) {
  // refactored with controllerAs in app.js and therefore can use pseudoclassical style for controllers
  var LCtrl = this;
  LCtrl.filter = '';
  LCtrl.data = {links: resolveData};

  // Links.getAll().then(function(data) { // when does this get executed?
  //   // if (data) {
  //   //   data.sort(function(link1, link2) {
  //   //     return link2.visits - link1.visits;
  //   //   });
  //   // }
    
  //   $scope.data.links = data;
  // });

})
.directive('shortenedLink', function() {
  return {
    restrict: 'E',
    template: '<a href="{{link.baseUrl}}/{{link.code}}">{{link.baseUrl}}/{{link.code}}</a>'
  };
});
