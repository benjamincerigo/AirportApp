'use strict';

// Declare app level module which depends on views, and components
angular.module('airportApp', [
  'ngRoute',
  'ngResource',
  'airportApp.services',
  'airportApp.searchFlight',
  'airportApp.flightView'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/search-flight'});
}])
//A title attribute
.directive('myTitle', function(){
	return{
		
		require: 'flightPast',
		link: function(s, e, a, c){
			
			c.addTitle(a.myTitle);
			
			
		}
	};
});
