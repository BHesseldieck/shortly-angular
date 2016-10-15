angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.filter = ''.toLowerCase();
  $scope.data = {
    // filterFn: function() {
    //   if ($scope.filter) {
    //     return this.links.filter(function(ele) {
    //       if (ele.title.toLowerCase().includes($scope.filter)) { 
    //         return true; 
    //       }
    //     });
    //   }
    //   return this.links;
    // }
  };

  Links.getAll().then(function(data) { // when does this get executed?
    // if (data) {
    //   data.sort(function(link1, link2) {
    //     return link2.visits - link1.visits;
    //   });
    // }
    
    $scope.data.links = data;
  });

});
