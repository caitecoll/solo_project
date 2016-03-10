myApp.factory('ContentFactory', ['$http', function($http) {

  var techProfiles = [];
  var devProfiles = [];
  var featTechProfiles = [];
  var featDevProfiles = [];

  var getTechProfs = function() {
    var promise = $http.get('/techprof').then(function(response) {
      techProfiles = response.data;
    });
    return promise;
  };

  var getDevProfs = function() {
    var promise = $http.get('/devprof').then(function(response) {
      devProfiles = response.data;
    });
    return promise;
  };

  var getFeaturedTech = function() {
    var promise = $http.get('/techprof/featured').then(function(response) {
      featTechProfiles = response.data;

    });
    return promise;
  };

  var getFeaturedDev = function() {
    var promise = $http.get('/devprof/featured').then(function(response) {
      featDevProfiles = response.data;
    });
    return promise;
  };

  var publicFunctions = {
    factoryTechList: function() {
      return techProfiles;
    },
    factoryRetrieveTechProfs: function() {
      return getTechProfs();
    },
    factoryDevList: function() {
      return devProfiles;
    },
    factoryRetrieveDevProfs: function() {
      return getDevProfs();
    },
    factoryFeaturedTech: function() {
      return getFeaturedTech();
    },
    factoryFeatTechList: function() {
      return featTechProfiles;
    },
    factoryFeaturedDev: function() {
      return getFeaturedDev();
    },
    factoryFeatDevList: function() {
      return featDevProfiles;
    }
  };

  return publicFunctions;

}]);
