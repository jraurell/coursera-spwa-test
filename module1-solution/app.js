(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = "";
    $scope.dishes = "";

    $scope.checkDishes = function () {
      var dishesNum = countDishes($scope.dishes);

      if(dishesNum < 1){
        $scope.message = "Please enter data first";
      }
      else if(dishesNum <= 3){
        $scope.message = "Enjoy!";
      }
      else{
        $scope.message = "Too much!";
      }
    };

    function countDishes(string){
      var count = 0;
      string = string.trim();
      if(string.length == 0){
        // 0
      }
      else{
        var dishes = string.split(",");
        dishes.forEach(function(dish){
          if(dish.trim().length > 0){
            count++;
          }
        });
      }

      return count;
    }

  };

})();
