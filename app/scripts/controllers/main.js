
angular.module('bowlingJackpotApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$location', '$http','LoginServices', '$timeout', 'localStorageService', '$cookieStore', 
    function($scope, $location, $http, LoginServices, $timeout, localStorageService, $cookieStore) {
   

  	$scope.submitLogin = function(){


  			var email = $scope.login.email;
  			var password = $scope.login.password;


  			var encodedLogin = btoa(email + ":" + password);

        $cookieStore.put('token', encodedLogin);

        //TokenHandler.set(email, password);
          
       // console.log(TokenHandler.get());    

      localStorageService.set('el', encodedLogin);

      console.log(localStorageService.get('el'));

      $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedLogin;

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
