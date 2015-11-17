angular.module('bowlingJackpotApp.services')

  .factory('LotteryServices', function($resource) {

	var factory = {}

	var baseUrl = 'http://bowling-api.nextcapital.com';


 

  


   factory.RollResultLeague = $resource(
        baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/roll',  
        null, 
        {
          'update':    {method:'PUT'}
        }
          
    )


return factory;

  })