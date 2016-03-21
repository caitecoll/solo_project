
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

myApp.directive('setClassWhenTop', ['$window', function($window) {
  var $win = angular.element($window); // wrap window object as jQuery object

  return {
    restrict: 'A',
    link: function (scope, element, attrs)
    {
      var topClass = attrs.setClassWhenTop, // get CSS class from directive's attribute value
        topPadding = parseInt(attrs.paddingWhenAtTop),
        offsetTop = 226; // get element's offset top relative to document
      $win.on('scroll', function (e) {
        if ($window.pageYOffset >= offsetTop) {
          element.addClass(topClass);
          element.removeClass("three");
          element.removeClass("columns");
        } else {
          element.removeClass(topClass);
          element.addClass("three");
          element.addClass("columns");
        }
      });
    }
  };
}]);

myApp.directive('setClassWhenAtTop', ['$window', function($window) {
  var $win = angular.element($window); // wrap window object as jQuery object

  return {
    restrict: 'A',
    link: function (scope, element, attrs)
    {
      var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
        topPadding = parseInt(attrs.paddingWhenAtTop),
        offsetTop = 226; // get element's offset top relative to document
      $win.on('scroll', function (e) {
        if ($window.pageYOffset >= offsetTop) {
          element.addClass(topClass);
        } else {
          element.removeClass(topClass);
        }
      });
    }
  };
}]);

