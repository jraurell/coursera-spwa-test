(function () {
'use strict';

angular.module('data')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  var categoriesCtrl = this;
  categoriesCtrl.categories = categories.data;
  //console.log("cat:", categoriesCtrl.categories);
}

})();
