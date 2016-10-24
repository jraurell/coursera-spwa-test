(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getDish = function (dish) {
    return $http.get(ApiPath + '/menu_items/'+dish+'.json').then(function (response) {
      return response.data;
    });
  };

  service.saveUserInfo = function (user) {
    service.userInfo = user;
    //console.log(service.user);
    return true;
  };

  service.getUserInfo = function (dish) {
    return service.userInfo;
  };

}



})();
