angular.module('bowlingJackpotApp')

  .factory('LoginServices', ['$resource', function($resource) {

  	var factory = {};

  	var baseUrl = 'http://bowling-api.nextcapital.com';


	  factory.Register = $resource(
  		baseUrl + '/api/users', 
  		{email: '@email', password: '@password'}, 
  		{
  			'save':    {method:'POST'}
  		}
  		
  	)


  	factory.Login = $resource(
  		baseUrl + '/api/login',
  		null,
  		{
	  		'save':    {method:'POST'}
        
	  		
  		}
  		
  	)

  	return factory;

  }])




