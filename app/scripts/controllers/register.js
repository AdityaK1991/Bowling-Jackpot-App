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

          function error(e) {
            
            $scope.showSpinner = false;

            if(e.status === 400) 
            {
              alert("Email has already been taken!")
            }

            else {
              alert("Network error! Please refresh the page!");
            }

          }
        )

  	}
  }]);
