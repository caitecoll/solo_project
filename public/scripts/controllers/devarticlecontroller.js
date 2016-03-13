myApp.controller('DevArticleController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.articles = [];

  $scope.contentFactory.factoryGetSelectedDevArticle().then(function() {
    $scope.articles = $scope.contentFactory.factorySelectedDevPost();
    //console.log('Selected Article', $scope.articles)
  });

}]);
