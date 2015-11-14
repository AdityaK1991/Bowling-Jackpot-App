angular.module('bowlingJackpotApp.services', ['ngResource'])

  .factory('LoginServices', function($resource) {

  	var factory = {};

  	var baseUrl = 'http://bowling-api.nextcapital.com';

	 // var token = "none";

   //console.log(localStorageService.get('el'));
   // var token = $cookieStore.get('token')

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

    //console.log("token:" + TokenHandler.get());


  	return factory;
  })




