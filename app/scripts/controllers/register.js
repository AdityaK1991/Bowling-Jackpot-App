angular.module('bowlingJackpotApp.controllers')
  .controller('RegisterCtrl', ['$scope', 'LoginServices', function ($scope, LoginServices) {
   
   $scope.submitRegister = function(){

  			var regEmail = $scope.register.email;
  			var regPassword = $scope.register.password;
  			var regcpassword = $scope.register.cpassword;

  			LoginServices.Register.save({email: regEmail, password: regPassword},
          function success() {

          },

          function error() {
            
          }
          )

  	}
  }]);
