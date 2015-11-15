angular.module('bowlingJackpotApp.controllers')
  .controller('BowlersCtrl', function ($scope, BowlerServices, $http, $cookies, $location) {


  	$scope.submitBowler = function(){

      $scope.showSpinnerCreate = true;

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var bowlerName = $scope.bname;

    	// $scope.bowlerCreated = false;
    	// $scope.bowlerNotCreated = false;

    	BowlerServices.CreateBowler.save({name: bowlerName},

    		function success() {
                  console.log("bowler created")
                  $scope.showSpinnerCreate = false;
                  $scope.bowlerCreated = true;
                },

                function error(e) {
                  if(e.status === 401) {
                    $scope.showSpinnerCreate = false;
                    alert("Unauthorized!")

                  }
                  else if(e.status == 400) {
                    $scope.showSpinnerCreate = false;
                  	alert("Bowler not created!")
                  	$scope.bowlerNotCreated = true
                  }
                }
    	)



    }


    $scope.listBowlers = function(){

      $scope.showSpinnerSearchAll = true;

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');
      console.log($cookies.get('Token'));

    	$scope.bowlers = BowlerServices.ListBowlers.query({},
        
        function success(){
          $scope.showSpinnerSearchAll = false;
        }),

        function error(e){

          $scope.showSpinnerSearchAll = false;

          if(e.status === 401) 
          {
            alert("Unauthorized!")
          }
        }
    }


		
	$scope.getBowler = function(){

      $scope.showSpinnerSearch = true;

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	$scope.bowler = BowlerServices.GetBowler.get({bowlerId : $scope.bId},
    		function success(){

          $scope.showSpinnerSearch = false;

    			if($scope.getBowler == {}) {
    				$scope.bowlerNotFound = true;
    			}

    		},
    		function error(e){
          if(e.status === 401) 
          {

            $scope.showSpinnerSearch = false;

            alert("Unauthorized!")

          }

    		})
    }


  $scope.logout = function(){

    $cookies.remove('Token');

    $location.path('/main');

  }


    
  });
  
