angular.module('bowlingJackpotApp.controllers')
  .controller('LeaguesCtrl', function (LeagueServices, $scope, $cookies, $location, $http) {
    


    $scope.showSpinner = true;

      $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');
      console.log($cookies.get('Token'));

      $scope.leagues = LeagueServices.ListLeagues.query({},
        
        function success(){
          $scope.showSpinner = false;
        },

        function error(e){

          $scope.showSpinner = false;

          if(e.status === 401) 
          {
            alert("Unauthorized!")
          }
        })



    $scope.createLeague = function(){

      $scope.showSpinner = true;

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var leagueName = $scope.lname;

    	LeagueServices.CreateLeague.save({name: leagueName},

    		function success() {                  

                  $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');
                   //console.log($cookies.get('Token'));

                    $scope.leagues = LeagueServices.ListLeagues.query({},
                      
                      function success(){
                        $scope.showSpinner = false;
                      },

                      function error(e){

                        $scope.showSpinner = false;

                        if(e.status === 401) 
                        {
                          alert("Unauthorized!")
                        }
                      })

                },

                function error(e) {
                  if(e.status === 401) {
                    $scope.showSpinner = false;
                    alert("Unauthorized!")
                  }
                  else if(e.status == 400) {
                    $scope.showSpinner = false;
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
