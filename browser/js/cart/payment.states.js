/* PAYMENT FORM STATE */
app.config(function($stateProvider) {
  
  $stateProvider.state('payment', {
    url: '/payment',
    templateUrl: '/js/cart/payment-entry.template.html',
  });

});