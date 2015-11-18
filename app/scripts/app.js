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
    'ngCookies',
    'ngRoute',
    'ngResource',
    'angularSpinner',
    'bowlingJackpotApp.controllers',
    'bowlingJackpotApp.services'
  ])


  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/leagues', {
        templateUrl: 'views/leagues.html',
        controller: 'LeaguesCtrl'
      })
      .when('/bowlers', {
        templateUrl: 'views/bowlers.html',
        controller: 'BowlersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
