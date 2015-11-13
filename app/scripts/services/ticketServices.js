angular.module('bowlingJackpotApp.services')

  .factory('LeagueServices', function($resource) {

	var factory = {}

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.BuyTicket = $resource(
  		baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/tickets', 
  		null, 
  		{
  			'save':    {method:'POST', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
  		
  	)


  factory.ListTickets = $resource(
      baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/tickets', 
      null, 
      {
        'get':    {method:'GET', isArray:true, headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
      }
      
    )


  factory.DrawTicket = $resource(
      baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/roll', 
      null, 
      {
        'get':    {method:'GET', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
      }
      
    )


  })