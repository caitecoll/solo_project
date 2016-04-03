myApp.controller('TechProfController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.tab = [];
  $scope.techProfiles = [];
  $scope.featTechProfiles = [];
  $scope.showme = [];

  //Loads all tech Profiles
  $scope.contentFactory.factoryRetrieveTechProfs().then(function() {
    $scope.techProfiles = $scope.contentFactory.factoryTechList();
  });

  //Loads all featured Tech Profiles
  $scope.contentFactory.factoryFeaturedTech().then(function() {
    $scope.featTechProfiles = $scope.contentFactory.factoryFeatTechList();
  });

  //Allows user to select a specific tech article and view it on an individual page
  $scope.selectArticle = function(id){
    $scope.contentFactory.getArticleId(id);
    $location.path('article');
  };

  //sets "Just the Facts" tab active for the specified article.
  $scope.makeFactsActive = function($index) {
    $scope.showme[$index] = false;
    $scope.tab[$index] = 0;
    console.log('Facts', $scope.showme[$index]);
  };

  //sets "Jargon" tab active for the specified article.
  $scope.makeJargonActive = function($index) {
    $scope.showme[$index] = true;
    $scope.tab[$index] = 1;
    console.log('Jargon', $scope.tab[$index]);
  };

}]);

