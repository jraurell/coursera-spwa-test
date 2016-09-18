(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListService() {
    var service = this;
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "chocolate cookies", quantity: 2 },
      { name: "chocolate bars", quantity: 4 },
      { name: "lemon cookies", quantity: 3 },
      { name: "chewy sugar cookies", quantity: 6 }
    ];
    var alreadyBoughtItems = [];

    service.buyItem = function (itemIndex) {
      alreadyBoughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };
  }

})();
