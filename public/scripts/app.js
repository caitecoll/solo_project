
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
    .otherwise({
      redirectTo: 'techprofile'
    });

}]);

var adminApp = angular.module('adminApp', ['ngRoute']);

adminApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/views/admin_templates/login.html',
      controller: 'LoginController'
    })
    .when('/allarticles', {
      templateUrl: '/views/admin_templates/allarticles.html',
      controller: 'AllArticlesController'
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
      redirectTo: 'allarticles'
    });

}]);