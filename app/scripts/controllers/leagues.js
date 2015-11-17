angular.module('bowlingJackpotApp.controllers')
  .controller('LeaguesCtrl', function (LeagueServices, BowlerServices, $scope, $cookies, $location, $http, $timeout) {
    
  $scope.showSpinner = true;


   $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.get('Token');
   console.log($cookies.get('Token'));

  
  $timeout(function () {

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



      //Called to populate Bowlers list during League selection
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
    

    }, 500);

     
    



    $scope.createLeague = function(lId){

      $scope.showSpinner = true;

    	var leagueName = $scope.lname;

    	LeagueServices.CreateLeague.save({name: leagueName},

    		function success() {                  

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
   )}




    $scope.addBowlerToLeague = function(bId, lId){

      console.log(bId)
      console.log(lId.id)

        $scope.showSpinner = true;

       
       var leagueB = LeagueServices.AddBowlerLeague.update({leagueId : lId.id, bowler_id : bId},
        function success(){

             $scope.leagueBowlers = LeagueServices.ListBowlersLeague.get({leagueId : lId.id},
              function success(){
                $scope.showSpinner = false;
                //console.log($scope.leagueBowlers.length)
              },
              function error(){
                $scope.showSpinner = false;
                //console.log($scope.leagueBowlers.length)
              })
        },
        function error(){
          $scope.showSpinner = false;
        })
     
    }





    $scope.listBowlersInLeague = function(lId){

      $scope.showSpinner = true;

       $timeout(function () {

         $scope.leagueBowlers = LeagueServices.ListBowlersLeague.get({leagueId : lId.id},
          function success(){

             $scope.lotteries = LeagueServices.ListLotteriesLeague.get({leagueId : lId.id},
                function success(){
                  $scope.showSpinner = false;
                },
                function error(){
                  $scope.showSpinner = false;
                })

            },
            function error(){
              $scope.showSpinner = false;
              //console.log($scope.leagueBowlers.length)
          })

       }, 200);

    }


    $scope.buyTicketForBowler = function(lId, loId, bId){

       $scope.showSpinner = true;

       console.log(lId.id);
       console.log(bId);
       console.log(loId);

       var ticketBowler = LeagueServices.BuyTicketBowler.save({leagueId:lId.id, lotteryId:loId, bowler_id:bId},
        function success(){

          $scope.tickets = LeagueServices.ListTickets.get({leagueId:lId.id, lotteryId:loId},
             function success(){

                $scope.lotteries = LeagueServices.ListLotteriesLeague.get({leagueId : lId.id},
                  function success(){
                    $scope.showSpinner = false;
                  },
                  function error(){
                    $scope.showSpinner = false;
                  })


            },
            function error(e){
              $scope.showSpinner = false;
              if(e.status==400){
                alert("Couldn't find a lottery with that ID!");
              }
              
          })

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



    $scope.toggleDetails = function($index, lId) {

      $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
      $scope.listBowlersInLeague(lId);
      //$scope.listLotteriesForLeague(loId);
    }


  })
