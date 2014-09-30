

'use strict';


angular.module('myApp.flightView', [])
//flight-view directive
.directive('flightView', function(){
	return{
		restrict: 'E',
		require: "^flightList",
		transclude: true,
		templateUrl: 'js/view1/flight-view.html',
		
		scope:{
			flight: '=info',
			remove: '&removeClick'
			
		},

		
		
	};

})
.directive('flightdep', function(){

	return {
		restrict: 'E',

		transclude: true,

		templateUrl: 'js/view1/flightdep.html',
		controller: ['$scope',function($scope){
			
			
			this.registering = false;
			this.addTitle = function(title){
				this.title = title;
			};

			this.addAirport = function(airport){
				this.airport = airport;
			};

			this.registerForm = function(){
				this.registering = true;
			};
			

		}],
		scope:{},
		controllerAs: 'moveCtrl'
		


	};
})

.directive("takeoff", function(){
	return{
		
		require: '?flightdep',
		link: function(s, e, a, c){
			console.log(c);
			c.addTitle('Departure');
			console.log(a.takeoff);
			c.addAirport(a.takeoff);
		}
	};
})

.directive('land', function(){
	return{
		
		require: '?flightdep',
		link: function(s, e, a, c){
			console.log(c);
			c.addTitle('Arrival');
			console.log(a.takeoff);
			c.addAirport(a.land);
		}
	};
})


//flightclick attribut
.directive('flightclick', function(){
	return {
		
		link: function(scope, element, attr){

			element.bind('click', function(){
				scope.$parent.$apply(attr.flightclick);
			});

		}
	};
})
.controller('moveRegistrationCtrl', function(){
	this.registation = {};

	this.
}

