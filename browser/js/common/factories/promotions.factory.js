'use strict';

app.factory('PromotionFactory', function ($http, $log) {
  var homePath = '/api/promotions/';
  var cache = [];

  return {
    
    fetchAll: function() { 
      return $http.get(homePath)
      .then(res => res.data)
      .then(promotions => {
        angular.copy(promotions, cache);
        return cache;
      })
      .catch($log.error);
    },

    getPromotions: function() {
      return cache;
    },

    add: function(promotion) {
      return $http.post(homePath, promotion)
      .then(res => res.data)
      .then(promotion => {
        cache.push(promotion);
        return promotion;
      })
      .catch($log.error);
    },

    update: function(promotionId, newData) {
      return $http.put(homePath+promotionId, newData)
      .then(res => res.data)
      .then(promotion => {
        cache.push(promotion);
        return promotion;
      })
      .catch($log.error);
    },

    delete: function(promotionId) {
      return $http.delete(homePath+promotionId)
      .then(function() {
        var filtered = cache.filter(function(promotion){
          return promotion._id !== promotionId;
        });
        angular.copy(filtered, cache);
      })
      .catch($log.error);
    }

  };

});