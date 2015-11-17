  angular.module('bowlingJackpotApp.controllers')
  .controller('BowlersCtrl', function ($scope, BowlerServices, $http, $cookies, $location, $timeout) {


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

            else {
              alert("Network error! Please refresh the page!");
            }
          })


  	$scope.createBowler = function(){

      $scope.showSpinner = true;


    	$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');

    	var bowlerName = $scope.bname;

    	BowlerServices.CreateBowler.save({name: bowlerName},

    		function success() {

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
              else {
              alert("Network error! Please refresh the page!");
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
          else {
              alert("Network error! Please refresh the page!");
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
          else {
              alert("Network error! Please refresh the page!");
            }

    		})

    }


  $timeout(function () {

      $scope.logout = function(){

        $scope.showSpinner = false;
        
        $cookies.remove('Token');

        $location.path('/main');

      }
    }, 1000)


    
  });
  
