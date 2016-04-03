myApp.controller('ReviewController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.drafts = [];
  $scope.comments = [];
  $scope.role;
  $scope.activeArticle;
  $scope.author;
  $scope.admin
  $scope.showme;

  //These assignments pull the relevant article, author and admin info
  $scope.activeArticle = $scope.adminFactory.factoryViewId();
  $scope.author = $scope.adminFactory.factorySendAuthor();
  $scope.admin = $scope.adminFactory.factorySendAdmin();

  //Check if user is logged in and verify role.
  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();
  });

  //This expression checks to see if the article is a tech profile (id < 5000) or a dev profile (id >= 5000) and then
  //returns the correct article
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

  //Adds Admin's comments/feedback
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

  //Sets the article as "approved" in the database, allowing it to be published at a later date
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