angular.module('bowlingJackpotApp.controllers')
  .controller('LeaguesCtrl', function (LeagueServices, BowlerServices, $scope, $cookies, $location, $http, $timeout) {
    
    $scope.showSpinner = true;

    var token = $cookies.get('Token');

    $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
    console.log(token);

  
    $timeout(function () {

      // called to populate Leagues list 
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

          else {
            alert("Network error! Please refresh the page!");
          }
        })



      // called to populate Bowlers list during League selection
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
    

    }, 500);

     
    


    // create a new League
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

                  else {
                    alert("Network error! Please refresh the page!");
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
            else {
              alert("Network error! Please refresh the page!");
            }
          }
   )}



    // add existing Bowler to the current League
    $scope.addBowlerToLeague = function(bId, lId){

      console.log(bId)
      console.log(lId.id)

        $scope.showSpinner = true;

       
       var leagueB = LeagueServices.AddBowlerLeague.update({leagueId : lId.id, bowler_id : bId},
        function success(){

             $scope.leagueBowlers = LeagueServices.ListBowlersLeague.get({leagueId : lId.id},
              function success(){
                $scope.showSpinner = false;
              },
              function error(){
                $scope.showSpinner = false;
              })
        },
        function error(){
          $scope.showSpinner = false;
        })
     
    }




    // list all the Bowlers in the current League
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

                   if(e.status === 401) 
                  {
                    alert("Unauthorized!")
                  }

                  else {
                    alert("Network error! Please refresh the page!");
                  }

                })

            },
            function error(){
              $scope.showSpinner = false;
              if(e.status === 401) 
              {
                  alert("Unauthorized!")
              }

              else {
                  alert("Network error! Please refresh the page!");
              }
        })

       }, 200);

    }


    // buy Ticket for a Bowler in the current League
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
                      if(e.status === 401) 
                      {
                        alert("Unauthorized!")
                      }

                      else {
                        alert("Network error! Please refresh the page!");
                      }
                  })


            },
            function error(e){
              $scope.showSpinner = false;
              if(e.status==400){
                alert("Couldn't find a lottery with that ID!");
              }
              else {
                alert("Network error! Please refresh the page!");
              }
              
          })

        },
        function error(){
          $scope.showSpinner = false;
        })

    }

    // update the Tickets list
    $scope.refreshTicketsList = function(lId, loId){

      $scope.showSpinner = true;
       $scope.tickets = LeagueServices.ListTickets.get({leagueId:lId.id, lotteryId:loId},
             function success(){
               $scope.showSpinner = false;
             },
             function error(e){
              $scope.showSpinner = false;
              if(e.status==400){
                alert("Please select a Lottery ID first!");
              }
              else {
                alert("Network error! Please refresh the page!");
              }
              
          })

    }



    // draw Ticket from the Lottery
    $scope.drawTicket = function(lId, loId){

      $scope.showSpinner = true;

      $scope.winners = LeagueServices.DrawTicket.get({leagueId:lId.id, lotteryId:loId},
         function success(){
          $scope.showSpinner = false;
        },
         function error(){
          $scope.showSpinner = false;
           if(e.status === 401) {
                alert("Unauthorized!")
           }
           else if(e.status == 400) {
              $scope.showSpinner = false;
              alert("Ticket could not be drawn!")
           }  

           else {
              alert("Network error! Please refresh the page!");
           }
        })

    }



    // update or change the Pin count
    $scope.pinCount = function(lId, loId){
      $scope.showSpinner = true;

      var pCount = LeagueServices.RollResultLeague.update({leagueId:lId.id, lotteryId:loId, pin_count:$scope.p_count },
         function success(){
          $scope.showSpinner = false;
          alert("Pin count updated!")
        },
        function error(e){
          $scope.showSpinner = false;
          if(e.status === 401) 
            {
              alert("Unauthorized!")
            }
            else if(e.status===404){
              alert("Please select League ID first!")
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



    $scope.toggleDetails = function($index, lId) {

      $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
      $scope.listBowlersInLeague(lId);
    }


  })
