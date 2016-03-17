myApp.controller('AllArticlesController', ['$scope', '$location', '$window', '$http', 'AdminFactory',
  function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.techArticles = [];
  $scope.devArticles = [];
  //$scope.authFact = AuthenticationFactory;

  //$scope.adminFactory.factoryCheckLogged().then(function() {
  //  $scope.adminFactory.factoryCheckRole();
  //});

    //.then(function() {
    //  $scope.techArticles = $scope.adminFactory.factoryTechPosts();
    //  $scope.devArticles = $scope.adminFactory.factoryDevPosts();
    //});

  //$scope.adminFactory.factoryGetTechArticles().then(function() {
  //  $scope.techArticles = $scope.adminFactory.factoryTechPosts();
  //});
  //
  //$scope.adminFactory.factoryGetDevArticles().then(function() {
  //  $scope.devArticles = $scope.adminFactory.factoryDevPosts();
  //});

  $scope.unPublish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishDev();
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishTech();
    }

    $scope.adminFactory.factoryCheckRole();

    //$scope.adminFactory.factoryGetTechArticles().then(function() {
    //  $scope.techArticles = $scope.adminFactory.factoryTechPosts();
    //});
    //
    //$scope.adminFactory.factoryGetDevArticles().then(function() {
    //  $scope.devArticles = $scope.adminFactory.factoryDevPosts();
    //});
  };

  $scope.Publish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishDev();
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishTech();
    }

    $scope.adminFactory.factoryCheckRole();

    //$scope.adminFactory.factoryGetTechArticles().then(function() {
    //  $scope.techArticles = $scope.adminFactory.factoryTechPosts();
    //});
    //
    //$scope.adminFactory.factoryGetDevArticles().then(function() {
    //  $scope.devArticles = $scope.adminFactory.factoryDevPosts();
    //});
  };

  $scope.Review = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('review');
  };

}]);
