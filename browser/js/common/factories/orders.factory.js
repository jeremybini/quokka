'use strict';

app.factory('OrderFactory', function ($http, $log) {

  return {
    fetchById : function (id) {
      return $http.get('/api/orders/' + id)
      .then(response => response.data)
      .catch($log.error);
    },

    fetchAllforUser : function (userId) {
      return $http.get('/api/orders/user/' + userId)
      .then(response => response.data) 
      .catch($log.error);
    },

    fetchAll : function () {
      return $http.get('/api/orders')
      .then(response => response.data)
      .catch($log.error);
    },

    delete : function (id) {
      return $http.delete('/api/orders' + id)
      .then(function(response) {
        return response.status;
      })
      .catch($log.error);
    },

    update : function (id, newStatus) {
      return $http.put('/api/orders' + id, newStatus)
      .then(response => response.data)
      .catch($log.error);
    }
  };

});