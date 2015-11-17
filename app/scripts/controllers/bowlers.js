  angular.module('bowlingJackpotApp.controllers')
  .controller('BowlersCtrl', function ($scope, BowlerServices, $http, $cookies, $location) {


//$scope.listBowlers = function(){

      $scope.showSpinner = true;

      $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');
      console.log($cookies.get('Token'));

      $scope.bowlers = BowlerServices.ListBowlers.query({},
        
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
    //}



  	$scope.createBowler = function(){

      $scope.showSpinner = true;


    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var bowlerName = $scope.bname;

    	// $scope.bowlerCreated = false;
    	// $scope.bowlerNotCreated = false;

    	BowlerServices.CreateBowler.save({name: bowlerName},

    		function success() {
                  console.log("bowler created")
                  //$scope.showSpinner = false;
                  $scope.bowlerCreated = true;

                  $scope.bowlers = BowlerServices.ListBowlers.query({},
        
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
            
            alert("Unauthorized!")

          }
          else if(e.status == 400) {
            $scope.showSpinner = false;
          	alert("Bowler not created!")
          	$scope.bowlerNotCreated = true
          }
        })

    }


		
	$scope.getBowler = function(){

      $scope.showSpinner = true;
      
      $scope.idpanel = true;

    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	$scope.bowler = BowlerServices.GetBowler.get({bowlerId : $scope.bId},
    		function success(){

          $scope.showSpinner = false;
          //console.log(Object.keys($scope.bowler).length)
    			if($scope.bowler === {}) {
    				$scope.bowlerNotFound = true;
    			}

    		},
    		function error(e){
          if(e.status === 401) {

            $scope.showSpinner = false;

            alert("Unauthorized!")

          }

    		})

    }



  $scope.logout = function(){

    $cookies.remove('Token');

    $location.path('/main');

  }


    
  });
  
