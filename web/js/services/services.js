'use strict';






angular.module('airportApp.services', ['ngRoute'])
.factory("myFactory", function() {
    return "a value";
})
.factory('Flight', ['$resource',
		function($resource) {
				return $resource('./flight/:id', {id: '@id'}, {
					getData: {method:'GET', isArray: true}
				});
				
		}
])
.factory('Schedule', ['$resource',
		function($resource) {
				return $resource('./schedule/:day/:id', {day: '@day', id: '@id'},{

					'get':    {method:'GET'},
					'query':  {method:'GET', isArray:true},
				});

		}
])

.factory('ADate', [
		function() {
				return new Date();
		}
])


.factory('helloRes', ['$resource', 
	function(){
			console.log('helloService');
			return $resource('/flight/');
	}
])

.factory('helloService', ['helloRes', '$route', '$q',
	function(helloRes, $route, $q){
			return function() {
			var delay = $q.defer();
			helloRes.get();
		}
	}
])

.factory('FlightLoader', ['Flight', '$route', '$q',
		function(Recipe, $route, $q) {
		return function() {
			var delay = $q.defer();
			Flight.get({id: $route.current.params.flightid}, function(flight) {
				delay.resolve(flight);
				}, function() {
				delay.reject('Unable to fetch recipe ' + $route.current.params.recipeId);
			});
			return delay.promise;
		}
	}
]);


