myApp.factory('AuthenticationFactory', ['$http', function($http) {
  var userName;
  var role;

  var checkLogged = function() {
    $http.get('/user').then(function(response) {
      if(response.data) {
        userName = response.data.username;
        role = response.data.role;
        console.log('User Name: ', userName);
        console.log('User Role: ', role);
      } else {
        $window.location.href = '/login.html';
      }
    });
  };

  var checkAdmin = function() {
    if(role == 'Admin') {

    } else {

    }
  };

  var publicFunctions = {
    factoryCheckLogged: function() {
      return checkLogged();
    },
    factoryCheckAdmin: function() {
      return checkAdmin();
    }
    //factoryCheckAuthor: function() {
    //  return checkAuthor();
    //}
  };

  return publicFunctions;

}]);

