angular.module('bowlingJackpotApp')

  .factory('BowlerServices', ['$resource', function($resource) {

	var factory = {};

	var baseUrl = 'http://bowling-api.nextcapital.com';

	 factory.CreateBowler = $resource(
  		baseUrl + '/api/bowlers', 
  		{name: '@name'}, 
  		{
  			'save':    {method:'POST'}
  		}
  		
  	)


	 factory.ListBowlers = $resource(
  		baseUrl + '/api/bowlers', 
  		null, 
  		{
  			'query':    {method:'GET', isArray:true}
  		}
	  		
	)


	 factory.GetBowler = $resource(
  		baseUrl + '/api/bowlers/:bowlerId', 
  		{bowlerId:'@bowlerId'}, 
  		{
  			'get':    {method:'GET'}
  		}
	  		
	)


	return factory;
  
}])