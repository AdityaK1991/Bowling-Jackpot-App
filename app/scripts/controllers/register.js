angular.module('bowlingJackpotApp.controllers')
  .controller('RegisterCtrl', ['$scope', '$location', 'LoginServices', function ($scope, $location, LoginServices) {
   
   $scope.submitRegister = function(){

        $scope.showSpinner = true;

  			var regEmail = $scope.register.email;
  			var regPassword = $scope.register.password;
  			var regcpassword = $scope.register.cpassword;

  			LoginServices.Register.save({email: regEmail, password: regPassword},
          function success() {

            $scope.showSpinner = false;
            $location.path('/home');

          },

          function error() {
            
            $scope.showSpinner = false;

          }
        )

  	}
  }]);
