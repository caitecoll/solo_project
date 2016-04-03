myApp.controller('ArticleController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.tab = 0;
  $scope.articles = [];
  $scope.activeArticle = $scope.contentFactory.factoryCurrentTech();

  if ($scope.activeArticle > 0 && $scope.activeArticle < 5000) {
    $scope.contentFactory.factoryGetSelectedArticle().then(function () {
      $scope.articles = $scope.contentFactory.factorySelectedPost();
    });

    $scope.contentFactory.factoryFeaturedTech().then(function() {
      $scope.featTechProfiles = $scope.contentFactory.factoryFeatTechList();
    });

  } else {
    $location.path('techprof');
  }

  $scope.makeArticleFactsActive = function () {
    $scope.showme = false;
    $scope.tab = 0;
  };

  $scope.makeArticleJargonActive = function () {
    $scope.showme = true;
    $scope.tab = 1;
  };

}]);
