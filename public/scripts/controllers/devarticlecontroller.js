myApp.controller('DevArticleController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.articles = [];
  $scope.activeArticle = $scope.contentFactory.factoryCurrentDev();

  if ($scope.activeArticle >= 5000) {
    $scope.contentFactory.factoryGetSelectedDevArticle().then(function () {
      $scope.articles = $scope.contentFactory.factorySelectedDevPost();
    });
    $scope.contentFactory.factoryFeaturedDev().then(function() {
      $scope.featDevProfiles = $scope.contentFactory.factoryFeatDevList();
    });
  } else {
    $location.path('techprof');
  }

}]);
