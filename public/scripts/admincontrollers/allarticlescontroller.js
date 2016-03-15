myApp.controller('AllArticlesController', ['$scope', '$location', '$window', '$http', 'AdminFactory', function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.techArticles = [];
  $scope.devArticles = [];

  $scope.adminFactory.factoryGetTechArticles().then(function() {
    $scope.techArticles = $scope.adminFactory.factoryTechPosts();
  });

  $scope.adminFactory.factoryGetDevArticles().then(function() {
    $scope.devArticles = $scope.adminFactory.factoryDevPosts();
  });

  $scope.unPublish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishDev();
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishTech();
    }

    $scope.adminFactory.factoryGetTechArticles().then(function() {
      $scope.techArticles = $scope.adminFactory.factoryTechPosts();
    });

    $scope.adminFactory.factoryGetDevArticles().then(function() {
      $scope.devArticles = $scope.adminFactory.factoryDevPosts();
    });
  };

  $scope.Publish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishDev();
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishTech();
    }

    $scope.adminFactory.factoryGetTechArticles().then(function() {
      $scope.techArticles = $scope.adminFactory.factoryTechPosts();
    });

    $scope.adminFactory.factoryGetDevArticles().then(function() {
      $scope.devArticles = $scope.adminFactory.factoryDevPosts();
    });
  };

  $scope.Review = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('review');
  };

  $scope.logout = function() {
    $http.get('/logout').then(function(){
      $window.location.href = '/#/techprofile';
    });
  };

}]);
