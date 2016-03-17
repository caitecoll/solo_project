myApp.controller('ReviewController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.drafts = [];
  $scope.showme;

  $scope.activeArticle = $scope.adminFactory.factoryViewId();

  if ($scope.activeArticle >= 5000) {
    $scope.adminFactory.factoryGetSelectedDevDraft().then(function() {
      $scope.drafts = $scope.adminFactory.factorySelectedDevDraft();
      $scope.showme = false;
    });
  } else {
    $scope.adminFactory.factoryGetSelectedDraft().then(function() {
      $scope.drafts = $scope.adminFactory.factorySelectedDraft();
      $scope.showme = true;
    });
  }


}]);