'use strict';

app.factory('UserFactory', function ($http, $log) {

  return {
    fetchById : function (id) {
      return $http.get('/api/users/' + id)
      .then(response => response.data)
      .catch($log.error);
    },

    fetchAll : function () {
      return $http.get('/api/users')
      .then(response => response.data)
      .catch($log.error);
    },

    fetchReviewsforUser : function (id) {
      return $http.get('/api/users/' + id + '/reviews')
      .then(response => response.data) 
      .catch($log.error);
    },

    delete : function (id) {
      return $http.delete('/api/users/' + id)
      .then(function(response) {
        return response.status;
      })
      .catch($log.error);
    },

    update : function (id, newUserInfo) {
      return $http.put('/api/users/' + id, newUserInfo)
      .then(response => response.data)
      .catch($log.error);
    }
  };

});