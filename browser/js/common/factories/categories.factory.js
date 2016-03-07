'use strict';

app.factory('CategoryFactory', function ($http, $log) {
  var homePath = '/api/categories/';
  var cache = [];

  return {
    
    fetchAll: function() { 
      return $http.get(homePath)
      .then(res => res.data)
      .then(categories => {
        angular.copy(categories, cache);
        return cache;
      })
      .catch($log.error);
    },

    getCategories: function() {
      return cache;
    },

    filterProductsByCategory: function(product, activeCategory) {
      if( !activeCategory ) return true;
      return product.categories.find(function(category) {
        return category._id === activeCategory._id;
      });
    },

    add: function(name) {
      return $http.post(homePath, {
        name: name
      })
      .then(res => res.data)
      .then(category => {
        cache.push(category);
        return category;
      })
      .catch($log.error);
    },

    delete: function(categoryId) {
      return $http.delete(homePath+categoryId)
      .then(function() {
        var filtered = cache.filter(function(category){
          return category._id !== categoryId;
        });
        angular.copy(filtered, cache);
      })
      .catch($log.error);
    }

  };

});