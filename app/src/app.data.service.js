/**
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
