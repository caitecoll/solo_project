myApp.controller('DevProfController', ['$scope', '$http', '$location', 'ContentFactory', function($scope, $http, $location, ContentFactory) {

  $scope.contentFactory = ContentFactory;

  $scope.devProfiles = [];
  $scope.featDevProfiles = [];

  //Loads all Dev Profiles
  $scope.contentFactory.factoryRetrieveDevProfs().then(function() {
    $scope.devProfiles = $scope.contentFactory.factoryDevList();
  });

  //Loads Featured Dev Profiles
  $scope.contentFactory.factoryFeaturedDev().then(function() {
    $scope.featDevProfiles = $scope.contentFactory.factoryFeatDevList();
  });

  //Allows user to select a specific dev article and view it on an individual page
  $scope.selectDevArticle = function(id){
    $scope.contentFactory.getDevArticleId(id);
    $location.path('devarticle');
  };
}]);