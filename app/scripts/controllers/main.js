
angular.module('bowlingJackpotApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$location', '$http','LoginServices', '$timeout', 'localStorageService', '$cookies', 
    function($scope, $location, $http, LoginServices, $timeout, localStorageService, $cookies) {
   

  	$scope.submitLogin = function(){


  			var email = $scope.login.email;
  			var password = $scope.login.password;


  			var encodedLogin = btoa(email + ":" + password);


        //TokenHandler.set(email, password);
          
       // console.log(TokenHandler.get());    

      $cookies.put('Token', encodedLogin)


      $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

       //console.log(localStorageService.get());

      //LoginServices.setToken(email, password);
       
          $timeout(function () {
            LoginServices.Login.save({},
                function success() {
                  $location.path('/home')
                },

                function error(e) {
                  if(e.status === 401) {
                    alert("Unauthorized!")
                  }
                }

              ) 
        }, 1000);


  	}

  }]);
