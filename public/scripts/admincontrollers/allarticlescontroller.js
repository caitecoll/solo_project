myApp.controller('AllArticlesController', ['$scope', '$location', '$window', '$http', 'AdminFactory',
  function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.techArticles = [];
  $scope.devArticles = [];

  $scope.unPublish = function(id, status) {
    if (id >= 5000) {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishDev();
    } else {
      $scope.adminFactory.factoryGetPostId(id);
      $scope.adminFactory.factoryUnpublishTech();
    }

    $scope.adminFactory.factoryCheckRole();
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
  };

  $scope.Review = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('review');
  };

  $scope.Edit = function(id) {
    $scope.adminFactory.factoryGetPostId(id);
    $location.path('edit');
  };

}]);
