'use strict';

/**
 * @ngdoc overview
 * @name bowlingJackpotApp
 * @description
 * # bowlingJackpotApp
 *
 * Main module of the application.
 */
angular
  .module('bowlingJackpotApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngResource',
    'ngTouch',
    'LocalStorageModule',
    'bowlingJackpotApp.controllers',
    'bowlingJackpotApp.services'
  ])

  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/forgotPassword', {
        templateUrl: 'views/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
