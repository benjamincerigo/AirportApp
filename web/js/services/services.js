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
.factory('FlightController', ['$resource',
		function($resource) {

				return $resource('./flightcontroller/:id', { id: '@id'}, {

					'get':    {method:'GET'}
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
.factory('repeatIdTest', function(){
	return function(array, value){
		if(array.length){
			for(var i=0;i<array.length;i++){
			
				if(array[i].id == value){
					console.log('found match');
					 return true;

				}else{
					return false;
				}
			};
		}
		else{
			return false;
		}
	}
})

.factory('removeByAttr', function(){
	return function(arr, attr, value){
	    var i = arr.length;
	    while(i--){
	       if( arr[i] 
	           && arr[i].hasOwnProperty(attr) 
	           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

	           arr.splice(i,1);

	       }
	    }
	    return arr;
	}
})



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


