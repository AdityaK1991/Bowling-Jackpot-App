 angular.module('bowlingJackpotApp.services')

 .factory('TokenHandler', function() {
      var tokenHandler = {};
      var token = null;

      tokenHandler.set = function(email, password) {
          token = btoa(email + ":" + password);
          //localStorageService.set('token', token)
          console.log(token);
      };


     

        tokenHandler.get = function() {
          console.log(token);
          return token;
      }; 
        
      

      return tokenHandler;
  })