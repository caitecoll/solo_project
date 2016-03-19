myApp.controller('ReviewController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.drafts = [];
  $scope.comments = [];
  $scope.role;
  $scope.activeArticle;
  $scope.author;
  $scope.admin
  $scope.showme;


  $scope.activeArticle = $scope.adminFactory.factoryViewId();
  $scope.author = $scope.adminFactory.factorySendAuthor();
  $scope.admin = $scope.adminFactory.factorySendAdmin();

  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();
  });

  if ($scope.activeArticle >= 5000) {
    $scope.adminFactory.factoryGetSelectedDevDraft().then(function () {
      $scope.drafts = $scope.adminFactory.factorySelectedDevDraft();

      $scope.adminFactory.factoryGetComments().then(function () {
        $scope.comments = $scope.adminFactory.factoryComments();
        if ($scope.comments.length >= 1) {
          $scope.feedback = true;
        }

      });
      $scope.showme = false;
    });
  } else if ($scope.activeArticle > 0 && $scope.activeArticle < 5000) {
    $scope.adminFactory.factoryGetSelectedDraft().then(function() {
      $scope.drafts = $scope.adminFactory.factorySelectedDraft();

      $scope.adminFactory.factoryGetComments().then(function() {
        $scope.comments = $scope.adminFactory.factoryComments();
        if ($scope.comments.length >= 1) {
          $scope.feedback = true;
        }
      });

      $scope.showme = true;
    });
  } else {
    $location.path('allarticles');
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