myApp.controller('ReviewController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.articles = [];

  //$scope.contentFactory.factoryGetSelectedArticle().then(function() {
  //  $scope.articles = $scope.contentFactory.factorySelectedPost();
  //});

}]);