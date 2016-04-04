myApp.factory('AdminFactory', ['$http', function($http) {

  var allTechPosts = [];
  var allDevPosts = [];
  var selectedArticleId;
  var selectedDraftData;
  var selectedDevDraftData;
  var userName;
  var role;
  var author_id;
  var admin_id;
  var comments;

 var checkLogged = function() {
   console.log('checking if logged in');
    return $http.get('/user').then(function(response) {
      if(response.data) {
        userName = response.data.username;
        role = response.data.role;
        author_id = response.data.author_id;
        admin_id = response.data.id;
        console.log('User Name: ', userName);
        console.log('User Role: ', role);
        console.log('Author_id: ', author_id);
      } else {
        $window.location.href = '/login.html';
      }
    });
  };

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

  var getMyTech = function() {
    //console.log('Get My Tech', author_id);
    var promise = $http.get('/allarticles/mytech/' + author_id).then(function(response) {
      allTechPosts = response.data;
    });
    return promise;
  };

  var getMyDev = function() {
    //console.log('Get My Dev', author_id);
    var promise = $http.get('/allarticles/mydev/' + author_id).then(function(response) {
      allDevPosts = response.data;
    });
    return promise;
  };

  var unpublishDev = function() {
    var data = {
      postStatus: 'Approved'
    };
    var promise = $http.put('/allarticles/devchange/' + selectedArticleId, data).then(function() {
      console.log("Article Unpublished")
    });
    return promise;
  };

  var unpublishTech = function() {
    var data = {
      postStatus: 'Approved'
    };

    var promise = $http.put('/allarticles/techchange/' + selectedArticleId, data).then(function() {
      console.log("Article Unpublished")
      });
    return promise;
  };

  var PublishDev = function() {
    var data = {
      postStatus: 'Published'
    };

    var promise = $http.put('/allarticles/devchange/' + selectedArticleId, data).then(function() {
      console.log("Article Published")
    });
    return promise;
  };

  var PublishTech = function() {
    var data = {
      postStatus: 'Published'
    };

    var promise = $http.put('/allarticles/techchange/' + selectedArticleId, data).then(function() {
      console.log("Article Published")
    });
    return promise;
  };

  var getSelectedDraft = function() {
    var promise = $http.get('/review/tech/' + selectedArticleId).then(function(response) {
      selectedDraftData = response.data;
    });
    return promise;
  };

  var getSelectedDevDraft = function() {
    var promise = $http.get('/review/dev/' + selectedArticleId).then(function(response) {
      selectedDevDraftData = response.data;
    });
    return promise;
  };

  var sendReview = function(data) {
    $http.post('/review/' + selectedArticleId, data);
  };

  var sendStatus = function(data) {
    $http.put('/review/' + selectedArticleId, data);
  };

  var getComments = function() {
    var promise = $http.get('/edit/' + selectedArticleId).then(function(response) {
      comments = response.data;
    });
    return promise;
  };

  var reviseTechArticle = function(article) {
    $http.put('/techprof/revise', article);
  };

  var reviseDevArticle = function(article) {
    $http.put('/devprof/revise', article);
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
    factoryDevPosts: function() {
      return allDevPosts;
    },
    factoryGetDevArticles: function() {
      return getAllDev();
    },
    factoryGetMyTechArticles: function() {
      return getMyTech();
    },
    factoryMyTechPosts: function() {
      return allTechPosts;
    },
    factoryGetMyDevArticles: function() {
      return getMyDev();
    },
    factoryMyDevPosts: function() {
      return allDevPosts;
    },
    factoryGetPostId: function(id){
      selectedArticleId = id;
      return selectedArticleId;
    },
    factoryViewId:function(){
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
    },
    factoryCheckLogged: function() {
      return checkLogged();
    },
    factorySendRole: function() {
      return role;
    },
    factorySendAdmin: function() {
      return admin_id;
    },
    factorySendAuthor: function() {
      return author_id;
    },
    factoryGetAuthor: function() {
      return author_id;
    },
    factoryGetSelectedDraft: function() {
      return getSelectedDraft();
    },
    factorySelectedDraft: function() {
      return selectedDraftData;
    },
    factoryGetSelectedDevDraft: function() {
      return getSelectedDevDraft();
    },
    factorySelectedDevDraft: function() {
      return selectedDevDraftData;
    },
    factorySendReview: function(data) {
      return sendReview(data);
    },
    factorySendStatus: function(data) {
      return sendStatus(data);
    },
    factoryGetComments: function() {
      return getComments();
    },
    factoryComments: function() {
      return comments;
    },
    factoryReviseTechArticle: function(article) {
      return reviseTechArticle(article);
    },
    factoryReviseDevArticle: function(article) {
      return reviseDevArticle(article);
    }
  };

  return publicFunctions;

}]);
