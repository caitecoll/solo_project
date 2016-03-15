myApp.controller('CreateController', ['$scope', '$location', '$http', 'AdminFactory', function($scope, $location, $http, AdminFactory) {

  //$scope.adminFactory = AdminFactory;
  //$scope.articles = [];

  //$scope.contentFactory.factoryGetSelectedArticle().then(function() {
  //  $scope.articles = $scope.contentFactory.factorySelectedPost();
  //});

  $scope.article = {};
  $scope.adminFactory = AdminFactory;

  $scope.addTechPost = function() {
    var article = {
      title: $scope.title,
      blurb: $scope.blurb,
      authorId: 1,
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

    $scope.title = '';
    $scope.blurb = '';
    $scope.nj_what = '';
    $scope.nj_why = '';
    $scope.nj_how_new_dev = '';
    $scope.nj_how_exp_dev = '';
    $scope.nj_how_sr_dev = '';
    $scope.nj_controversy = '';
    $scope.j_what = '';
    $scope.j_why = '';
    $scope.j_how_new_dev = '';
    $scope.j_how_exp_dev = '';
    $scope.j_how_sr_dev = '';
    $scope.j_controversy = '';
    $scope.terms = '';
    $scope.additional_resources = '';
  };

  $scope.addDevPost = function() {
    var article = {
      title: $scope.devtitle,
      blurb: $scope.devblurb,
      authorId: 1,
      content: $scope.content
    };

    $scope.adminFactory.factorySaveDevArticle(article);

    $scope.devtitle = '';
    $scope.devblurb = '';
    $scope.content = '';
  };


}]);



