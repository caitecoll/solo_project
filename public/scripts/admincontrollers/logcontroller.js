myApp.controller('LogController', ['$scope', '$location', '$http', '$window', 'AdminFactory', function($scope, $location, $http, $window, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.admin;
  $scope.role;

  $scope.techArticles = [];
  $scope.devArticles = [{article_title: "hi"}];

  $scope.logout = function() {
    $http.get('/logout').then(function(){
      $window.location.href = '/#/techprofile';
    });
  };

  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();

    if ($scope.role == 'Admin') {
      $scope.admin = true;

    } else if ($scope.role == 'Author') {
      $scope.admin = false;
    }
  });


}]);