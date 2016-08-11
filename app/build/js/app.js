/**
* Main Controller
* @namespace Controller
* @listens index.html
*/

(function() {
  'use strict';

  angular
  .module('app.controller', [])
  .controller('controller', controller);

  controller.$inject = ['$scope', 'dataService', 'toastr'];

  /**
  * @namespace controller
  */
  function controller($scope, dataService, toastr){

    var ctrl = this;

    ctrl.products = [];
    ctrl.shoppingcart = {};

    ctrl.addItemShoppingcart = addItemShoppingcart;
    ctrl.removeItemShoppingcart = removeItemShoppingcart;
    ctrl.getProductById = getProductById;

    ctrl.plusProducts = plusProducts;
    ctrl.minusProducts = minusProducts;

    ctrl.buy = buy;

    /*TEST*/
    $scope.calculateAmountTest = calculateAmount;


    /////////////////////

    init();

    /**
    * @namespace Init Function
    */
    function init(){
      getProducts();
      getShoppingcart();
    }

    /**
    * @namespace getProducts
    */
    function getProducts(){
      dataService.getProducts().then(function(preducts){
        ctrl.products = preducts;
      })
    }

    /**
    * @namespace getShoppingcart
    */
    function getShoppingcart(){
      dataService.getShoppingcart().then(function(shoppingcart){
        ctrl.shoppingcart = shoppingcart;
      })
    }

    /**
    * @namespace addItemShoppingcart
    */
    function addItemShoppingcart(product){
      var commerceItem = new CommerceItem(product, product.quantityOfThisProduct);
      dataService.addItemShoppingcart(commerceItem).then(function(response){
        ctrl.shoppingcart.items.push(commerceItem);
        ctrl.shoppingcart.amount = calculateAmount(ctrl.shoppingcart);
      })
    }

    /**
    * @namespace removeItemShoppingcart
    */
    function removeItemShoppingcart(item, index){
      dataService.removeItemShoppingcart(item).then(function(response){
        ctrl.shoppingcart.items.splice(index, 1);
        ctrl.shoppingcart.amount = calculateAmount(ctrl.shoppingcart);
      })
    }


    /**
    * @namespace getProductById
    */
    function getProductById(commerceItem, products){
      commerceItem.product = _.filter(products, function(prod) {
        return prod.id === commerceItem.product_id;
      })[0];
    }


    /**
    * @namespace minusProducts
    */
    function minusProducts(prod){
      if(prod.quantityOfThisProduct > 1){
        prod.quantityOfThisProduct--;
      }
    }

    /**
    * @namespace plusProducts
    */
    function plusProducts(prod){
      prod.quantityOfThisProduct++;
    }

    /**
    * @namespace plusProducts
    */
    function calculateAmount(shoppingcart){
      console.log(angular.toJson(shoppingcart));
      var amount = _.chain(angular.copy(shoppingcart.items))
      .pluck('amount')
      .reduce(function(item, num){return item + num}, 0)
      .value()
      .toFixed(2)
      .replace(".", ",");

      return amount;
    }


    /**
    * @namespace buy
    */
    function buy(shoppingcart){
      $(".modal").modal("hide");
      setTimeout(function () {
        toastr.success("Thank you for Buy with Us!");
        getShoppingcart();
      }, 100);
    }



  }

})();
;/**
* app.data.service
* @namespace dataService
*/

(function() {
  'use strict';

  angular.module('app.data.service', [])
  .factory('dataService', dataService);
  dataService.$inject = ['toastr', '$http', '$log', '$q', 'URL'];

  function dataService(toastr, $http, $log, $q, URL) {
    var service = {
      getProducts : getProducts,
      getShoppingcart : getShoppingcart,
      removeItemShoppingcart : removeItemShoppingcart,
      addItemShoppingcart : addItemShoppingcart,
    };

    return service;

    ///////////////////////

    /**
    * @namespace getProducts
    */
    function getProducts(){
      return $http.get(URL+"/products").then(
        function(res){
          return res.data;
        }, function(res){
          $log.warn("ERROR|getProducts");
          $log.warn(res);
          return res;
        });
      }

      /**
      * @namespace getProducts
      */
      function getShoppingcart(){
        return $http.get(URL+"/shoppingcart").then(
          function(res){
            return res.data;
          }, function(res){
            $log.warn("ERROR|getShoppingcart");
            $log.warn(res);
            return res;
          });
        }


        /**
        * @namespace removeItemShoppingcart
        */
        function removeItemShoppingcart(item){
          return $http.delete(URL+"/shoppingcart/items/"+item.id).then(
            function(res){
              return res.data;
            }, function(res){
              $log.warn("ERROR|removeItemShoppingcart");
              $log.warn(res);
              return res;
            });
          }

          /**
          * @namespace addItemShoppingcart
          */
          function addItemShoppingcart(item){
            return $http.post(URL+"/shoppingcart/items?product_id="+item.product_id+"&quantity="+item.quantity, item, {headers: {'Content-Type': 'application/json'}}).then(
              function(res){
                console.log(res);
                return res.data;
              }, function(res){
                $log.warn("ERROR|addItemShoppingcart");
                $log.warn(res);
                return res;
              });
            }

          }
        })();
;/**
* mcFadyen Project Module
* @namespace app.module
* @desc FIX
*/


(function() {
  'use strict';

  angular.module('app',
  [
    'app.core',
    /*
    * Components
    */
    'app.controller',
    'app.data.service',
    /*
    * Directives
    */
  ]);

})();
;/**
* Core Modules
* @namespace app.core
* @desc FIX
*/
(function() {
  'use strict';

  angular.module('app.core', [
    /*
    * Angular modules
    */
    'ngSanitize',
    'ngCookies',
    'ngResource',
    'ui.router',
    /*
    * Core modules
    */
    'app.constants',
    'app.router'
  ])
})();
;/**
* Router
* @namespace app.router
* @desc FIX
*/
(function() {
  'use strict';

  angular.module('app.router', [])
  .config(Routes);
  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/content");
    $stateProvider
    .state('content', {
      url: "/content",
      controller: 'controller',
      controllerAs: 'ctrl',
      templateUrl: "/app/src/view/content.html"
    })
  }
})();
;/**
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
;/**
* Constants
* @namespace app.constants
* @desc FIX
*/
(function() {
    'use strict';
    angular
        .module('app.constants', [])
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('URL', 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api');
})();
;/**
* @namespace CommerceItem
*/

function CommerceItem(product, quantity){
  this.id = new Date().getTime();
  this.product_id = product.id;
  this.quantity = quantity;
  this.amount = quantity * product.price;
}
