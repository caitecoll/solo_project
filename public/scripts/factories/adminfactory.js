myApp.factory('AdminFactory', ['$http', function($http) {

  var allTechPosts = [];
  var allDevPosts = [];
  var selectedArticleId;
  var selectedArticleData;

  var saveTechArticle = function(article) {
    $http.post('/techprof', article).then(function(response) {
    });
  };

  var saveDevArticle = function(article) {
    $http.post('/devprof', article).then(function(response) {
    });
  };

  var getAllTech = function() {
    var promise = $http.get('/allarticles/alltech').then(function(response) {
      allTechPosts = response.data;
    });
    return promise;
  };

  var getAllDev = function() {
    var promise = $http.get('/allarticles/alldev').then(function(response) {
      allDevPosts = response.data;
    });
    return promise;
  };

  var unpublishDev = function() {
    var data = {
      postStatus: 'Approved'
    };

    console.log(data);

    $http.put('/allarticles/devchange/' + selectedArticleId, data).then(function(response) {
    });
  };

  var unpublishTech = function() {
    var data = {
      postStatus: 'Approved'
    };

    $http.put('/allarticles/techchange/' + selectedArticleId, data).then(function(response) {
    });
  };

  var PublishDev = function() {
    var data = {
      postStatus: 'Published'
    };

    console.log(data);

    $http.put('/allarticles/devchange/' + selectedArticleId, data).then(function(response) {
    });
  };

  var PublishTech = function() {
    var data = {
      postStatus: 'Published'
    };

    $http.put('/allarticles/techchange/' + selectedArticleId, data).then(function(response) {
    });
  };

  var publicFunctions = {
    factorySaveTechArticle: function(article) {
      return saveTechArticle(article);
    },
    factorySaveDevArticle: function(article) {
      return saveDevArticle(article);
    },
    factoryGetTechArticles: function() {
      return getAllTech();
    },
    factoryTechPosts: function() {
      return allTechPosts;
    },
    factoryGetDevArticles: function() {
      return getAllDev();
    },
    factoryDevPosts: function() {
      return allDevPosts;
    },
    factoryGetPostId: function(id){
      selectedArticleId = id;
      return selectedArticleId;
    },
    factoryUnpublishDev: function() {
      return unpublishDev();
    },
    factoryUnpublishTech: function() {
      return unpublishTech();
    },
    factoryPublishDev: function() {
      return PublishDev();
    },
    factoryPublishTech: function() {
      return PublishTech();
    }
  };

  return publicFunctions;

}]);
