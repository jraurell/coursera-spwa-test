(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user','MenuService'];
function MyInfoController(user, MenuService) {
  var myInfo = this;

  myInfo.user = user;
}

})();
