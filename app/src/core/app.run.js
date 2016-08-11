/**
* Run Module
* @namespace app.run
*/

(function() {
  'use strict';

  angular.module('app')
  .run(Run);

  Run.$inject = ['$rootScope'];

  function Run ($rootScope) {

    $rootScope.goTo = goTo;
    $rootScope.goToModal = goToModal;
    $rootScope.formatCurrency = formatCurrency;

    /**
    * @namespace goTo
    */
    function goTo(url){
      $('.modal').modal('hide');
      setTimeout(function () {
        window.location.replace("#/"+url);
      }, 300);
    };

    /**
    * @namespace goTo
    */
    function goToModal(id){
      $('.modal').modal('hide');
      setTimeout(function () {
        $("#"+id).modal('show');
      }, 300);
    };


    /**
    * @namespace formatCurrency
    */
    function formatCurrency(value){
      return value.toFixed(2).replace(".", ",");
    };

  }
})();
