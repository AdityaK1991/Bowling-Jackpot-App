angular.module('bowlingJackpotApp.controllers')
  .controller('BowlersCtrl', function ($scope, BowlerServices, $http, $cookies) {



  	$scope.submitBowler = function(){

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var bowlerName = $scope.bname;

    	BowlerServices.CreateBowler.save({name: bowlerName},

    		function success() {
                  console.log("bowler created")
                },

                function error(e) {
                  if(e.status === 401) {
                    alert("Unauthorized!")
                  }
                  else if(e.status == 400) {
                  	alert("Bowler not created!")
                  }
                }
    	)



    }


    $scope.getBowlers = function(){

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	$scope.bowlers = BowlerServices.ListBowlers.query()
    }

		
  
    
  });
