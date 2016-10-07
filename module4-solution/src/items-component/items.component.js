(function () {
'use strict';

angular.module('data')
.component('itemsComponent', {
  templateUrl: 'src/items-component/items.component.html',
  bindings: {
    items: '<'
  }
});

})();
