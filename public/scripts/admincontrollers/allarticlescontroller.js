myApp.controller('AllArticlesController', ['$scope', '$location', '$window', '$http', 'AdminFactory',
  function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.techArticles = [];
  $scope.devArticles = [];

  //check that user is logged in. If they are, check the user's role. If they are an admin, show them every article.
  //If they're an author, show them only their own articles.
  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();

    console.log('logged in', $scope.role);
    if ($scope.role == 'Admin') {
      $scope.adminFactory.factoryGetTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryTechPosts();
      });
      $scope.adminFactory.factoryGetDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryDevPosts();
      });
    } else if ($scope.role == 'Author') {
      $scope.adminFactory.factoryGetMyTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryMyTechPosts();
      });
      $scope.adminFactory.factoryGetMyDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryMyDevPosts();
      });
    }
  });

  //Unpublish an article so it no longer displays for website visitors.
  $scope.unPublish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishDev().then(function() {
        $scope.adminFactory.factoryGetTechArticles().then(function() {
          $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        });
        $scope.adminFactory.factoryGetDevArticles().then(function() {
          $scope.devArticles = $scope.adminFactory.factoryDevPosts();
        });
      });
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishTech().then(function() {
        $scope.adminFactory.factoryGetTechArticles().then(function () {
          $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        });
        $scope.adminFactory.factoryGetDevArticles().then(function () {
          $scope.devArticles = $scope.adminFactory.factoryDevPosts();
        });
      });
    }


  };

    //Publish an article so it displays for website visitors.
    $scope.Publish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishDev().then(function() {
        $scope.adminFactory.factoryGetTechArticles().then(function () {
          $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        });
        $scope.adminFactory.factoryGetDevArticles().then(function () {
          $scope.devArticles = $scope.adminFactory.factoryDevPosts();
        });
      });
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryPublishTech();
      $scope.adminFactory.factoryGetTechArticles().then(function() {
        $scope.adminFactory.factoryGetTechArticles().then(function() {
          $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        });
        $scope.adminFactory.factoryGetDevArticles().then(function () {
          $scope.devArticles = $scope.adminFactory.factoryDevPosts();
        });
      });
    }
  };

  //Gets relevant article and opens it in the review view.
  $scope.Review = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('review');
  };

  //Gets relevant article and opens it in the edit view.
  $scope.Edit = function(id) {
    console.log(id);
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('edit');
  };

}]);
