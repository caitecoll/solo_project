
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
    //.when('/searchresults', {
    //  templateUrl: '/views/templates/searchresults.html',
    //  controller: 'SearchController'
    //})
    .otherwise({
      redirectTo: 'techprofile'
    });

}]);