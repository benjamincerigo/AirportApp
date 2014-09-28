'use strict';






angular.module('myApp.services', ['ngRoute'])
.factory("myFactory", function() {
    return "a value";
});
/*.factory('Flight', ['$resource',
		function($resource) {
				return $resource('/flight/:id', {id: '@id'});
		}
])


.factory('HelloWorld', 
		function(msg) {
			conolse.log(msg);
		}
)

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
])*/


