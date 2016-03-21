myApp.controller('CreateController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  $scope.tab = 0;

  $scope.article = {};
  $scope.adminFactory = AdminFactory;
  $scope.author = $scope.adminFactory.factoryGetAuthor();
  $scope.showme = false;
  $scope.role;

  $scope.adminFactory.factoryCheckLogged().then(function() {
    $scope.role = $scope.adminFactory.factorySendRole();
  });

  $scope.addTechPost = function() {
    $scope.author = $scope.adminFactory.factoryGetAuthor();
    console.log('This is the author', $scope.author);
    var article = {
      title: $scope.title,
      blurb: $scope.blurb,
      author_id: $scope.author,
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

    $scope.adminFactory.factorySaveTechArticle(article);
    //
    //$scope.title = '';
    //$scope.blurb = '';
    //$scope.nj_what = '';
    //$scope.nj_why = '';
    //$scope.nj_how_new_dev = '';
    //$scope.nj_how_exp_dev = '';
    //$scope.nj_how_sr_dev = '';
    //$scope.nj_controversy = '';
    //$scope.j_what = '';
    //$scope.j_why = '';
    //$scope.j_how_new_dev = '';
    //$scope.j_how_exp_dev = '';
    //$scope.j_how_sr_dev = '';
    //$scope.j_controversy = '';
    //$scope.terms = '';
    //$scope.additional_resources = '';

    $location.path('allarticles');
  };

  $scope.addDevPost = function() {
    var article = {
      title: $scope.devtitle,
      blurb: $scope.devblurb,
      author_id: $scope.author,
      content: $scope.content
    };

    $scope.adminFactory.factorySaveDevArticle(article);

    //$scope.devtitle = '';
    //$scope.devblurb = '';
    //$scope.content = '';
    $location.path('allarticles');
  };

  $scope.makeFirstActive = function() {
    $scope.showme = false;
    $scope.tab = 0;
  };

  $scope.makeSecondActive = function() {
    $scope.showme = true;
    $scope.tab = 1;
  };


}]);



