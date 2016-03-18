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

  //var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
  //  var deferred = $q.defer();
  //  // Make an AJAX call to check if the user is logged in
  //
  //  $http.get('/user').success(function(user){
  //
  //    // Authenticated
  //    if (user !== '0') {
  //      deferred.resolve();
  //    }
  //    else {
  //      $rootScope.message = 'You need to log in.';
  //      deferred.reject();
  //      $window.location.href = '/login.html';
  //    }
  //  });
  //
  //  return deferred.promise;
  //};

  //checkLogged();

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
    console.log('Get My Tech', author_id);
    var promise = $http.get('/allarticles/mytech/' + author_id).then(function(response) {
      allTechPosts = response.data;
    });
    return promise;
  };

  var getMyDev = function() {
    console.log('Get My Dev', author_id);
    var promise = $http.get('/allarticles/mydev/' + author_id).then(function(response) {
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

  var getSelectedDraft = function() {
    console.log('This is the selected ID');
    var promise = $http.get('/review/tech/' + selectedArticleId).then(function(response) {
      console.log('This is the response', response.data);
      selectedDraftData = response.data;
      console.log('This is the draft', selectedDraftData);
    });
    return promise;
  };

  var getSelectedDevDraft = function() {
    console.log('This is the selected ID', selectedArticleId);
    var promise = $http.get('/review/dev/' + selectedArticleId).then(function(response) {
      console.log('This is the response', response.data);
      selectedDevDraftData = response.data;
      console.log('This is the draft', selectedDevDraftData);
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
      console.log('These are the comments on this article:', comments);
    });
    return promise;
  };

  var reviseTechArticle = function(article) {
    $http.put('/techprof/revise', article).then(function(response) {
    });
  };

  var reviseDevArticle = function(article) {
    $http.put('/devprof/revise', article).then(function(response) {
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
      console.log('This is the selectedArticleID', selectedArticleId);
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
    factoryCheckRole: function() {
      return checkRole();
    },
    factoryCheckLoggedIn: function() {
      return checkLoggedin;
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
