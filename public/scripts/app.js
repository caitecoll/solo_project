
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  //var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
  //  var deferred = $q.defer();
  //  // Make an AJAX call to check if the user is logged in
  //
  //  $http.get('/user').success(function(user){
  //
  //    // Authenticated
  //    if (user !== '0') {
  //      deferred.resolve();
  //    }
  //    else {
  //      $rootScope.message = 'You need to log in.';
  //      deferred.reject();
  //      $window.location.href = '/login.html';
  //    }
  //  });
  //
  //  return deferred.promise;
  //};

  $routeProvider
    .when('/techprofile', {
      templateUrl: '/views/templates/techprofile.html',
      controller: 'TechProfController'
    })
    .when('/devprofile', {
      templateUrl: '/views/templates/devprofile.html',
      controller: 'DevProfController'
    })
    .when('/article', {
      templateUrl: '/views/templates/article.html',
      controller: 'ArticleController'
    })
    .when('/devarticle', {
      templateUrl: '/views/templates/devarticle.html',
      controller: 'DevArticleController'
    })
    .when('/allarticles', {
      templateUrl: '/views/admin_templates/allarticles.html',
      controller: 'AllArticlesController'
      //resolve: {
      //  loggedin: factoryCheckLoggedIn
      //}
    })
    .when('/create', {
      templateUrl: '/views/admin_templates/create.html',
      controller: 'CreateController'
    })
    .when('/review', {
      templateUrl: '/views/admin_templates/review.html',
      controller: 'ReviewController'
    })
    .otherwise({
      redirectTo: 'techprofile'
    });

}]);

var loginApp = angular.module('loginApp', []);

loginApp.controller('LoginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  $scope.userName;

  // This happens after page load, which means it has authenticated if it was ever going to
  // NOT SECURE
  $http.get('/user').then(function(response) {
    if(response.data) {
      $scope.userName = response.data.username;
      console.log('User Data: ', $scope.userName);
    } else {
      $window.location.href = '/login.html';
    }
  });
}]);