myApp.controller('ArticleController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.tab = 0;
  $scope.articles = [];
  $scope.activeArticle = $scope.contentFactory.factoryCurrentTech();

  //verifies that the article selected is actually a tech article. If undefined, will redirect to main techprofile view.
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

  //sets "Just the Facts" tab active
  $scope.makeArticleFactsActive = function () {
    $scope.showme = false;
    $scope.tab = 0;
  };

  //sets "Jargon" tab active
  $scope.makeArticleJargonActive = function () {
    $scope.showme = true;
    $scope.tab = 1;
  };

}]);
