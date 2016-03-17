myApp.controller('LogController', ['$scope', '$location', '$http', '$window', 'AdminFactory', function($scope, $location, $http, $window, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.admin;
  $scope.role;

  $scope.techArticles = [];
  $scope.devArticles = [];

  $scope.logout = function() {
    $http.get('/logout').then(function(){
      $window.location.href = '/#/techprofile';
    });
  };

  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();

    if ($scope.role == 'Admin') {
      $scope.admin = true;
      $scope.adminFactory.factoryGetTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryTechPosts();
        console.log('These are the techArticles', $scope.techArticles);
      });
      $scope.adminFactory.factoryGetDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryMyDevPosts();
        console.log('These are the devArticles', $scope.devArticles);
      });
    } else if ($scope.role == 'Author') {
      $scope.admin = false;
      $scope.adminFactory.factoryGetMyTechArticles().then(function() {
        $scope.techArticles = $scope.adminFactory.factoryMyTechPosts()});
      $scope.adminFactory.factoryGetMyDevArticles().then(function() {
        $scope.devArticles = $scope.adminFactory.factoryMyDevPosts();
        console.log('These are the devArticles', $scope.devArticles);
      });
    }
  });


}]);