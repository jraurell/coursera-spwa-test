(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var signUp = this;

  signUp.submit = function () {
    signUp.error = "";
    signUp.ok_message = "";
    if(signUp.user.favorite_dish == null
      || signUp.user.favorite_dish.length < 2)
    {
      signUp.error = "Invalid dish-number";
      //console.log('Error: ' + signUp.error);
    }
    else{
      //console.log('submit');
      var dish = signUp.user.favorite_dish.trim();
      var promise = MenuService.getDish(dish);

      promise.then(function (data) {
        if(data == null
          || data.short_name !== dish)
        {
          signUp.error = "This dish-number doesn't exist";
          //console.log('Error: ' + signUp.error);
        }
        else{
          //console.log(data);
          signUp.user.dish = data;
          var result = MenuService.saveUserInfo(signUp.user);
          if(result){
            signUp.ok_message = "Your information has been saved.";
          }
          else{
            signUp.error = "Saving error";
          }
        }
      })
      .catch(function (error) {
        signUp.error = "This dish-number doesn't exist";
        //console.log(error);
      })
    }

  };
}


})();
