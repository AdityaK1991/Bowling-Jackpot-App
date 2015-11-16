angular.module('bowlingJackpotApp.services')

  .factory('LeagueServices', function($resource) {

	 var factory = {};

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.CreateLeague = $resource(
  		baseUrl + '/api/leagues', 
  		{name: '@name'}, 
  		{
  			'save':    {method:'POST'}
  		}
  		
  	)


	 factory.ListLeagues = $resource(
  		baseUrl + '/api/leagues', 
  		null, 
  		{
  			'get':    {method:'GET', isArray:true}
  		}
	  		
	)


	 factory.GetLeague = $resource(
  		baseUrl + '/api/leagues/:leagueId', 
  		null, 
  		{
  			'get':    {method:'GET'}
  		}
	  		
	)


	 factory.AddBowlerLeague = $resource(
	        baseUrl + '/api/leagues/:leagueId/bowlers', 
	        {leagueId : '@leagueId', bowler_Id:'@bowler_Id'}, 
	        {
	          'update':    {method:'PUT'}
	        }
	        
	  )


	 factory.ListBowlersLeague = $resource(
	      baseUrl + '/api/leagues/:leagueId/bowlers',  
	      {leagueId : '@leagueId'}, 
	      {
	        'get':    {method:'GET', isArray:true}
	      }
	        
	  )


	return factory;
})