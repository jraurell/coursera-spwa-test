(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&',
        message: '<'
      },
      controller: FoundItemsListController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsListController(){
    var list = this;

  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;
    narrowItDown.filterTxt = "";
    narrowItDown.message = "";

    narrowItDown.filterMenu = function () {
      narrowItDown.found = [];
      narrowItDown.message = "";
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.filterTxt);

      promise.then(function (data) {
        narrowItDown.found = data.items
        if(!narrowItDown.found.length){
          narrowItDown.message = "Nothing found";
        }
      })
      .catch(function (error) {
        console.log(error);
      })

    };

    narrowItDown.removeItem = function (itemIndex) {
      narrowItDown.found.splice(itemIndex, 1);
    };
  }

  // -----------------------------------------------------------------
  MenuSearchService.$inject = ['$q','$http', 'ApiBasePath']
  function MenuSearchService($q, $http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm){
      var deferred = $q.defer();
      var promise = getItems();

      var result = {
        items: []
      };

      promise.then(function (response) {
        result.items = filterMenu(response.data, searchTerm);
        deferred.resolve(result);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

      return deferred.promise;
    };

    function getItems() {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

  };

  function filterMenu(data, searchTerm){
    var itemsFiltered = [];
    data.menu_items.forEach(function(item){
      //console.log(item.description);
      if(item.description.indexOf(searchTerm) !== -1){
          itemsFiltered.push(item);
      }
    });
    //console.log(itemsFiltered);
    return itemsFiltered;
  };

})();
