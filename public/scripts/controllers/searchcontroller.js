myApp.controller('SearchController', ['$scope', '$http', '$location', 'ContentFactory', function($scope, $http, $location, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.searchText = undefined;
  $scope.articles = [];

  //Once at least one character is typed into the search input, sends query to DB, checking for article bodies/titles
  //that contain those characters. Sends a new query for each character typed and displays results.
  $scope.change = function() {
    var query = $scope.searchText;
    if (query.length >= 1) {
      $http.get('/search/' + query).then(function(result){
        $scope.articles = result.data;
      });
    }
    else {
      $scope.articles = [];
    }
  };

  //When user clicks on a search result, checks to see if the article is a tech profile (id < 5000) or a dev profile
  // (id >= 5000), saves the article id and redirects to the corresponding view
  $scope.selectResult = function(id){
    $scope.searchText = '';
    $scope.articles = [];
    if (id >= 5000) {
      $scope.contentFactory.getDevArticleId(id);
      $location.path('devarticle');
    } else {
      $scope.contentFactory.getArticleId(id);
      $location.path('article');
    }

  };

}]);
