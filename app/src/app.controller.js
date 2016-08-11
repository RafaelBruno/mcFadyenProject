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
