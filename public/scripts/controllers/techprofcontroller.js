myApp.controller('TechProfController', ['$scope', '$location', '$http', 'ContentFactory', function($scope, $location, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;

  $scope.techProfiles = [];
  $scope.featTechProfiles = [];

  $scope.contentFactory.factoryRetrieveTechProfs().then(function() {
    $scope.techProfiles = $scope.contentFactory.factoryTechList();
    //console.log('These are the tech profiles in the controller', $scope.techProfiles);
  });

  $scope.contentFactory.factoryFeaturedTech().then(function() {
    $scope.featTechProfiles = $scope.contentFactory.factoryFeatTechList();
    console.log('These are the featured tech profiles in the controller', $scope.featTechProfiles);
  });

  $scope.selectArticle = function(id){
    $scope.contentFactory.getArticleId(id);
    $location.path('article');
  };

  //$scope.class = "active";
  //$scope.changeClass = function(){
  //  if ($scope.class === "active")
  //    $scope.class = "";
  //  else
  //    $scope.class = "active";
  //};



}]);
