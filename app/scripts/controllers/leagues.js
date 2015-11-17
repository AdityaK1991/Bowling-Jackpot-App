angular.module('bowlingJackpotApp.controllers')
  .controller('LeaguesCtrl', function (LeagueServices, BowlerServices, $scope, $cookies, $location, $http) {
    


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
            //alert("Unauthorized!")
          }
        })




     $scope.bowlers = BowlerServices.ListBowlers.query({},
        
        function success(){
          $scope.showSpinner = false;
        },

        function error(e){

          $scope.showSpinner = false;

          if(e.status === 401) 
          {
           // alert("Unauthorized!")
          }
        })


     
    
     //$scope.leagueBowlers 



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




    $scope.addBowlerToLeague = function(bId, lId){

      console.log(bId)
      console.log(lId.id)

      $scope.showSpinner = true;

     var leagueB = LeagueServices.AddBowlerLeague.update({leagueId : lId.id, bowler_id : bId},
      function success(){
        $scope.showSpinner = false;
      },
      function error(){
        $scope.showSpinner = false;
      })

    

    }


    $scope.listBowlersInLeague = function(lId){

      $scope.showSpinner = true;

       $scope.leagueBowlers = LeagueServices.ListBowlersLeague.get({leagueId : lId.id},
        function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })


    }


    $scope.listLotteriesForLeague = function(lId){

      $scope.showSpinner = true;

      $scope.lotteries = LeagueServices.ListLotteriesLeague.get({leagueId : lId.id},
        function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })

    }



    $scope.buyTicketForBowler = function(lId, loId, bId){

       $scope.showSpinner = true;

       console.log(lId.id);
       console.log(bId);
       console.log(loId);

       var ticketBowler = LeagueServices.BuyTicketBowler.save({leagueId:lId.id, lotteryId:loId, bowler_id:bId},
        function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })

    }



    $scope.listTicketsForJackpot = function(lId, loId){

      $scope.showSpinner = true;

      $scope.tickets = LeagueServices.ListTickets.get({leagueId:lId.id, lotteryId:loId},
         function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })
    }



    $scope.drawTicket = function(lId, loId){

      $scope.showSpinner = true;

      $scope.winners = LeagueServices.DrawTicket.get({leagueId:lId.id, lotteryId:loId},
         function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })

    }



    $scope.pinCount = function(lId, loId){
      $scope.showSpinner = true;

      var pCount = LeagueServices.RollResultLeague.update({leagueId:lId.id, lotteryId:loId, pin_count:$scope.p_count },
         function success(){
          $scope.showSpinner = false;
        },
        function error(){
          $scope.showSpinner = false;
        })
    }




    $scope.logout = function(){

      $cookies.remove('Token');

      $location.path('/main');

    }



    $scope.toggleDetails = function($index) {

      $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    }


  })
