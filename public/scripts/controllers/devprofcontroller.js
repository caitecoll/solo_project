myApp.controller('DevProfController', ['$scope', '$http', '$location', 'ContentFactory', function($scope, $http, $location, ContentFactory) {

  $scope.contentFactory = ContentFactory;

  $scope.devProfiles = [];
  $scope.featDevProfiles = [];

  $scope.contentFactory.factoryRetrieveDevProfs().then(function() {
    $scope.devProfiles = $scope.contentFactory.factoryDevList();
  });

  $scope.contentFactory.factoryFeaturedDev().then(function() {
    $scope.featDevProfiles = $scope.contentFactory.factoryFeatDevList();
  });

  $scope.selectDevArticle = function(id){
    $scope.contentFactory.getDevArticleId(id);
    $location.path('devarticle');
  };
}]);