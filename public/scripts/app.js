
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

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
    .when('/edit', {
      templateUrl: '/views/admin_templates/edit.html',
      controller: 'EditController'
    })
    .when('/register', {
      templateUrl: '/views/admin_templates/register.html'
      //controller: 'ReviewController'
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