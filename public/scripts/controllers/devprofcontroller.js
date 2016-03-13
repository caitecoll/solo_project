myApp.controller('DevProfController', ['$scope', '$http', '$location', 'ContentFactory', function($scope, $http, $location, ContentFactory) {

  $scope.contentFactory = ContentFactory;

  $scope.devProfiles = [];
  $scope.featDevProfiles = [];

  $scope.contentFactory.factoryRetrieveDevProfs().then(function() {
    $scope.devProfiles = $scope.contentFactory.factoryDevList();
    //console.log('These are the dev profiles in the controller', $scope.devProfiles);
  });

  $scope.contentFactory.factoryFeaturedDev().then(function() {
    $scope.featDevProfiles = $scope.contentFactory.factoryFeatDevList();
    //console.log('These are the featured dev profiles in the controller', $scope.featDevProfiles);
  });

  $scope.selectDevArticle = function(id){
    $scope.contentFactory.getDevArticleId(id);
    $location.path('devarticle');
  };
}]);