myApp.controller('SearchController', ['$scope', '$http', 'ContentFactory', function($scope, $http, ContentFactory) {

  $scope.contentFactory = ContentFactory;
  $scope.searchText = undefined;
  $scope.articles = [];

  $scope.change = function() {
    var query = $scope.searchText;
    //console.log('This is the query', query);
    $http.get('/search/' + query).then(function(result){
      $scope.articles = result.data;
      console.log('These are the results', $scope.articles);
    });
  };

}]);
