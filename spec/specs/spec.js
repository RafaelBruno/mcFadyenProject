describe("BooksApp", function(){

  var scope,
  shoppingcart,
  controller;
  beforeEach(function () {
    module('app');
  });

  describe('appCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      shoppingcart = {
        "items":[
          {
            "id":1470951949245,
            "product_id":"10ce6eec-fb54-49cc-99d6-4c0a509410c7",
            "quantity":1,
            "amount":206.1,
            "product":{
              "id":"10ce6eec-fb54-49cc-99d6-4c0a509410c7",
              "name":"Apple TV",
              "price":206.1,
              "image":"images/10ce6eec-fb54-49cc-99d6-4c0a509410c7.jpg",
              "quantityOfThisProduct":1
            }
          },
          {
            "id":1470951961554,
            "product_id":"6c682929-ee49-4f86-a8ca-f63cf90b03de",
            "quantity":2,
            "amount":78
          }
        ],
        "amount":"206,10"
      }
      controller = $controller('controller', {
        '$scope': scope
      });
    }));

    it('Subtotal Amout', function () {
      expect(scope.calculateAmountTest(shoppingcart) === "284,10").toBe(true);
    });

  });

});
