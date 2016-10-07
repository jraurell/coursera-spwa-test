(function () {
'use strict';

angular.module('data')
.component('categoriesComponent', {
  templateUrl: 'src/categories-component/categories.component.html',
  bindings: {
    categories: '<'
  }
});

})();
