'use strict';

app.factory('CategoryFactory', function ($http, $log) {

  return {
    categories: [
        {
            name: "Dogs"
        },
        {
            name: "Cats"
        },
        {
            name: "Other Critters"
        },
    ]
  };

});