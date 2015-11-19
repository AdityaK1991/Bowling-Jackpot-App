
angular.module('bowlingJackpotApp')
  .controller('MainCtrl', ['$scope', '$location', '$http','LoginServices', '$timeout', '$cookies', 
    function($scope, $location, $http, LoginServices, $timeout, $cookies) {
   
    

  	$scope.submitLogin = function(){

        $scope.showSpinner = true;

  			var email = $scope.login.email;
  			var password = $scope.login.password;

  			var encodedLogin = btoa(email + ":" + password);

          $cookies.put('Token', encodedLogin)

          var token = $cookies.get('Token');

          $http.defaults.headers.common['Authorization'] = 'Basic ' + token;

       
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

                    alert("Username or Password is incorrect! Please try again!")

                  }
                }

              ) 
        }, 1000);

  	}

  }]);
