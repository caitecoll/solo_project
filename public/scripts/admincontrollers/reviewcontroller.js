myApp.controller('ReviewController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.drafts = [];
  $scope.showme;

  $scope.activeArticle = $scope.adminFactory.factoryViewId();
  $scope.role = $scope.adminFactory.factorySendRole();
  $scope.author = $scope.adminFactory.factorySendAuthor();
  $scope.admin = $scope.adminFactory.factorySendAdmin();

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

  $scope.addComments = function() {
    console.log('Reviewer Comments', $scope.revComments);

    var data = {
      admin_id: $scope.admin,
      comments: $scope.revComments,
      article_id: $scope.activeArticle,
      status: 'Awaiting Author Review'
    };

    $scope.adminFactory.factorySendReview(data);
    $scope.adminFactory.factorySendStatus(data);

    $location.path('allarticles');
  };

  $scope.approve = function() {
    console.log('This is approved with the following feedback', $scope.revComments);

    var data = {
      admin_id: $scope.admin,
      comments: $scope.revComments,
      article_id: $scope.activeArticle,
      status: 'Approved'
    };

    $scope.adminFactory.factorySendReview(data);
    $scope.adminFactory.factorySendStatus(data);

    $location.path('allarticles');
  };


}]);