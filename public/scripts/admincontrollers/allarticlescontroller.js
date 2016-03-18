myApp.controller('AllArticlesController', ['$scope', '$location', '$window', '$http', 'AdminFactory',
  function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.techArticles = [];
  $scope.devArticles = [];

  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();

    console.log('logged in');
    if ($scope.role == 'Admin') {
      $scope.adminFactory.factoryGetTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        console.log('These are the techArticles', $scope.techArticles);
      });
      $scope.adminFactory.factoryGetDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryDevPosts();
        console.log('These are the devArticles', $scope.devArticles);
      });
    } else if ($scope.role == 'Author') {
      $scope.adminFactory.factoryGetMyTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryMyTechPosts();
        console.log('These are the techArticles', $scope.techArticles);
      });
      $scope.adminFactory.factoryGetMyDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryMyDevPosts();
        console.log('These are the devArticles', $scope.devArticles);
      });
    }
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
      console.log('These are the techArticles', $scope.techArticles);
    });
    $scope.adminFactory.factoryGetDevArticles().then(function() {
      $scope.devArticles = $scope.adminFactory.factoryDevPosts();
      console.log('These are the devArticles', $scope.devArticles);
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
      console.log('These are the techArticles', $scope.techArticles);
    });
    $scope.adminFactory.factoryGetDevArticles().then(function() {
      $scope.devArticles = $scope.adminFactory.factoryDevPosts();
      console.log('These are the devArticles', $scope.devArticles);
    });
  };

  $scope.Review = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('review');
  };

  $scope.Edit = function(id) {
    console.log(id);
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('edit');
  };

}]);
