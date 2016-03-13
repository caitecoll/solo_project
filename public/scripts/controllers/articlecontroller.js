myApp.controller('ArticleController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.articles = [];

  $scope.contentFactory.factoryGetSelectedArticle().then(function() {
    $scope.articles = $scope.contentFactory.factorySelectedPost();
  });

}]);
