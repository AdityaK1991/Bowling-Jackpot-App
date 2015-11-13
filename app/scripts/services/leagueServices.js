angular.module('bowlingJackpotApp.services')

  .factory('LeagueServices', function($resource) {

	var factory = {}

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.CreateLeague = $resource(
  		baseUrl + '/api/leagues', 
  		null, 
  		{
  			'save':    {method:'POST', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
  		
  	)


	 factory.ListLeagues = $resource(
  		baseUrl + '/api/leagues', 
  		null, 
  		{
  			'get':    {method:'GET', isArray:true, headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
	  		
	)


	 factory.GetLeague = $resource(
  		baseUrl + '/api/leagues/:leagueId', 
  		null, 
  		{
  			'get':    {method:'GET', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
	  		
	)


	 factory.AddBowlerLeague = $resource(
	        baseUrl + '/api/leagues/:leagueId/bowlers', 
	        null, 
	        {
	          'update':    {method:'PUT', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
	        }
	        
	  )


	 factory.ListBowlersLeague = $resource(
	      baseUrl + '/api/leagues/:leagueId/bowlers',  
	      null, 
	      {
	        'get':    {method:'GET', isArray:true, headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
	      }
	        
	  )


	 factory.ListLotteriesLeague = $resource(
	      baseUrl + '/api/leagues/:leagueId/lotteries',  
	      null, 
	      {
	        'get':    {method:'GET', isArray:true, headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
	      }
	        
	  )


	 factory.GetLotteryLeague = $resource(
	      baseUrl + '/api/leagues/:leagueId/lotteries/lotteryId',  
	      null, 
	      {
	        'get':    {method:'GET', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
	      }
	        
	  )


	 factory.RollResultLeague = $resource(
	      baseUrl + '/api/leagues/:leagueId/lotteries/:lotteryId/roll',  
	      null, 
	      {
	        'update':    {method:'PUT', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
	      }
	        
	  )



	return factory
})