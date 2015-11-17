
angular.module('bowlingJackpotApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$location', '$http','LoginServices', '$timeout', '$cookies', 
    function($scope, $location, $http, LoginServices, $timeout, $cookies) {
   
    

  	$scope.submitLogin = function(){

        $scope.showSpinner = true;

  			var email = $scope.login.email;
  			var password = $scope.login.password;

  			var encodedLogin = btoa(email + ":" + password);

          $cookies.put('Token', encodedLogin)

          $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

       
          $timeout(function () {

            LoginServices.Login.save({},

                function success() {

                  $scope.showSpinner=false;

                  $location.path('/bowlers')
                
                },

                function error(e) {

                  $scope.loading = false;

                  if(e.status === 401) {

                    $scope.showSpinner=false;

                    alert("Unauthorized!")

                  }
                }

              ) 
        }, 1000);

  	}

  }]);
