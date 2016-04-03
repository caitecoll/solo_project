myApp.controller('SearchController', ['$scope', '$http', '$location', 'ContentFactory', function($scope, $http, $location, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.searchText = undefined;
  $scope.articles = [];

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
