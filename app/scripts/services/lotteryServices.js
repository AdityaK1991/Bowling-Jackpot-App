angular.module('bowlingJackpotApp.services')

  .factory('LotteryServices', function($resource) {

	var factory = {}

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.BuyTicket = $resource(
  		baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/tickets', 
  		null, 
  		{
  			'save':    {method:'POST'}
  		}
  		
  	)


  factory.ListTickets = $resource(
      baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/tickets', 
      null, 
      {
        'get':    {method:'GET', isArray:true}
      }
      
    )


  factory.DrawTicket = $resource(
      baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/roll', 
      null, 
      {
        'get':    {method:'GET'}
      }
      
    )


  factory.ListLotteriesLeague = $resource(
        baseUrl + '/api/leagues/:leagueId/lotteries',  
        null, 
        {
          'get':    {method:'GET', isArray:true}
        }
          
    )


   factory.GetLotteryLeague = $resource(
        baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId',  
        null, 
        {
          'get':    {method:'GET'}
        }
          
    )


   factory.RollResultLeague = $resource(
        baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/roll',  
        null, 
        {
          'update':    {method:'PUT'}
        }
          
    )


return factory;

  })