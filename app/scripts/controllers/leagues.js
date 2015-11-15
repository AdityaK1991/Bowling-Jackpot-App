angular.module('bowlingJackpotApp.controllers')
  .controller('LeaguesCtrl', function (LServices, $scope, $cookies, $location) {
    

    $scope.submitLeague = function(){

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var leagueName = $scope.lname;

    	LeagueServices.CreateLeague.save({name: leagueName},

    		function success() {
                  alert("League created!")
                },

                function error(e) {
                  if(e.status === 401) {
                    alert("Unauthorized!")
                  }
                  else if(e.status == 400) {
                  	alert("League not created!")
                  }
                }
    	   )

    }

    $scope.logout = function(){

      $cookies.remove('Token');

      $location.path('/main');

    }





		
  })
