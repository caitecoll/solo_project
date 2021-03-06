myApp.controller('EditController', ['$scope', '$location', '$window', '$http', 'AdminFactory', function($scope, $location, $window, $http, AdminFactory) {

  $scope.adminFactory = AdminFactory;
  $scope.drafts = [];
  $scope.comments = [];
  $scope.showme;
  $scope.role;

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
    $scope.adminFactory.factoryGetSelectedDevDraft().then(function() {
      $scope.drafts = $scope.adminFactory.factorySelectedDevDraft();

      $scope.adminFactory.factoryGetComments().then(function() {
        $scope.comments = $scope.adminFactory.factoryComments();
        if ($scope.comments.length >= 1) {
          $scope.feedback = true;
        }
      });
      enterDevData();
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
      enterTechData();
      $scope.showme = true;
    });
  } else {
    $location.path('allarticles');
  }

  //Populates data on page for dev article
  function enterDevData() {
    $scope.devtitle = $scope.drafts[0].article_title;
    $scope.devblurb = $scope.drafts[0].article_blurb;
    $scope.content = $scope.drafts[0].content;
  }

  //Populates data on page for tech article
  function enterTechData() {

    $scope.title = $scope.drafts[0].article_title;
    $scope.blurb = $scope.drafts[0].article_blurb;
    $scope.nj_what = $scope.drafts[0].nj_what;
    $scope.nj_why = $scope.drafts[0].nj_why;
    $scope.nj_how_new_dev = $scope.drafts[0].nj_how_new_dev;
    $scope.nj_how_exp_dev = $scope.drafts[0].nj_how_exp_dev;
    $scope.nj_how_sr_dev = $scope.drafts[0].nj_how_sr_dev;
    $scope.nj_controversy = $scope.drafts[0].nj_controversy;
    $scope.j_what = $scope.drafts[0].j_what;
    $scope.j_why = $scope.drafts[0].j_why;
    $scope.j_how_new_dev = $scope.drafts[0].j_how_new_dev;
    $scope.j_how_exp_dev = $scope.drafts[0].j_how_exp_dev;
    $scope.j_how_sr_dev = $scope.drafts[0].j_how_sr_dev;
    $scope.j_controversy = $scope.drafts[0].j_controversy;
    $scope.terms = $scope.drafts[0].terms;
    $scope.additional_resources = $scope.drafts[0].additional_resources;
  }

  //Adds Author's comments/feedback
  $scope.addAuthComments = function() {
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

  //Adds updated dev article to database
  $scope.addDevRevision = function() {
    var article = {
      title: $scope.devtitle,
      blurb: $scope.devblurb,
      article_id: $scope.activeArticle,
      content: $scope.content
    };

    var data = {
      admin_id: $scope.admin,
      comments: $scope.authDevComments,
      article_id: $scope.activeArticle,
      status: 'Awaiting Admin Review'
    };

    $scope.adminFactory.factoryReviseTechArticle(article);
    $scope.adminFactory.factorySendReview(data);
    $scope.adminFactory.factorySendStatus(data);

    $location.path('allarticles');
  };

  //Adds updated tech article to database
  $scope.addTechRevision = function() {
    var article = {
      title: $scope.title,
      article_id: $scope.activeArticle,
      blurb: $scope.blurb,
      nj_what: $scope.nj_what,
      nj_why: $scope.nj_why,
      nj_how_new_dev: $scope.nj_how_new_dev,
      nj_how_exp_dev: $scope.nj_how_exp_dev,
      nj_how_sr_dev: $scope.nj_how_sr_dev,
      nj_controversy: $scope.nj_controversy,
      j_what: $scope.j_what,
      j_why: $scope.j_why,
      j_how_new_dev: $scope.j_how_new_dev,
      j_how_exp_dev: $scope.j_how_exp_dev,
      j_how_sr_dev: $scope.j_how_sr_dev,
      j_controversy: $scope.j_controversy,
      terms: $scope.terms,
      additional_resources: $scope.additional_resources
    };

    var data = {
      admin_id: $scope.admin,
      comments: $scope.authTechComments,
      article_id: $scope.activeArticle,
      status: 'Awaiting Admin Review'
    };

    $scope.adminFactory.factoryReviseDevArticle(article);
    $scope.adminFactory.factorySendReview(data);
    $scope.adminFactory.factorySendStatus(data);

    $location.path('allarticles');
  };

}]);

