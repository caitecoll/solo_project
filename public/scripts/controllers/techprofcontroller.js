myApp.controller('TechProfController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.tab = [];
  $scope.techProfiles = [];
  $scope.featTechProfiles = [];
  $scope.showme = [];

  $scope.contentFactory.factoryRetrieveTechProfs().then(function() {
    $scope.techProfiles = $scope.contentFactory.factoryTechList();
  });

  $scope.contentFactory.factoryFeaturedTech().then(function() {
    $scope.featTechProfiles = $scope.contentFactory.factoryFeatTechList();
  });

  $scope.selectArticle = function(id){
    $scope.contentFactory.getArticleId(id);
    $location.path('article');
  };

  $scope.makeFactsActive = function($index) {
    $scope.showme[$index] = false;
    $scope.tab[$index] = 0;
    console.log('Facts', $scope.showme[$index]);
  };

  $scope.makeJargonActive = function($index) {
    $scope.showme[$index] = true;
    $scope.tab[$index] = 1;
    console.log('Jargon', $scope.tab[$index]);
  };

}]);

