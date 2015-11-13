angular.module('bowlingJackpotApp.services')

  .factory('BowlerServices', function($resource) {

	var factory = {}

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.CreateBowler = $resource(
  		baseUrl + '/api/bowlers', 
  		null, 
  		{
  			'save':    {method:'POST', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
  		
  	)


	 factory.ListBowlers = $resource(
  		baseUrl + '/api/bowlers', 
  		null, 
  		{
  			'get':    {method:'GET', isArray:true, headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
	  		
	)


	 factory.GetBowler = $resource(
  		baseUrl + '/api/bowlers/:bowlerId', 
  		null, 
  		{
  			'get':    {method:'GET', headers: {'Authorization': 'Basic cm9ja3kxMjM6MTIz' }}
  		}
	  		
	)



	return factory
})