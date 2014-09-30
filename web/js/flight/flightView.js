

'use strict';


angular.module('airportApp.flightView', [])


//flight-view directive
.directive('flightView', function(){
	return{
		restrict: 'E',
		require: "^flightList",
		transclude: true,
		templateUrl: 'js/view/flight-view.html',
		controller: ['Schedule', 'ADate','$scope', function(Schedule, ADate, $scope){
			
			//scduel for the day which is loaded from the select in the flight-schedual select
			$scope.flight.scheduleForDay = [];
			this.flight = $scope.flight;
			//Initialize to today
			this.flight.day = ADate.getDay().toString();
			// Watch for change
			$scope.$watch('flight.day', function(day){
				
				if(($scope.flight.id != undefined) && ($scope.flight.id != 'Search A new flight')){
					
					//Load Schedule
					Schedule.query({day:day, id: $scope.flight.id}, function(data){
						//success
						//botch Load
						$scope.flight.scheduleForDay = [];
						for(var i=0; i<data.length;i++){
							$scope.flight.scheduleForDay.push({'time':data[i]});
							
						}	
						
					}, function(e){
						//error
						alert(e);
					});
				}
			});

			/* 
			Things I would add:

			$scope.findFlightControllers = function(){
				Would use a service called FlightControllers to make the query on the data base. 
				Would use flight id, Date and time of Event to find the controllers in the flight_event_contolers table
				
			}

			Would also use a Websocket to update the pastFlightEvents array
			So that the list on the view will be updated when you register and FlightEvent

			Could use Pusher or Socket.IO
			Pusher.subscribe('pastFlightEvents', 'updated', function (pastFlightEvents) {
				// Table has update
				// Update our list
				switch(pastFlightEvents.table){
					case 'departures':
						$scope.departures.push(pastFlightEvents.newEvent);
						break;
					case 'arrivals':
						$scope.arrivals.push(pastFlightEvents.newEvent);
						break;
					}
				}
				
			}
			*/

		}],
		
		scope:{
			//flight passed through info attruibut
			flight: '=info',
			//Remove click calls funtion in remove-click attrubute
			remove: '&removeClick'
			
		},

		
		
	};

})
.directive('flightdep', function(){

	return {
		restrict: 'E',

		transclude: true,

		templateUrl: 'js/view/flightdep.html',
		controller: ['$scope',function($scope){
			
			// Boolean to show or hide registering
			this.registering = false;
			//From attibutes
			this.addTitle = function(title){
				this.title = title;
			};
			//From attibutes
			this.addAirport = function(airport){
				this.airport = airport;
			};
			//Does nothing now but shows registering
			this.registerForm = function(){

				this.registering = true;
				//would make call to server to save the data from the form. 
				//And create a new row on the Depatures or Arrivals table.
			};
			

		}],
		scope:{},
		controllerAs: 'moveCtrl'
		


	};
})
//Attubute to create a subclass takeoff
.directive("takeoff", function(){
	return{
		
		require: '?flightdep',
		link: function(s, e, a, c){
			
			c.addTitle('Departure');
			
			c.addAirport(a.takeoff);
		}
	};
})
//Attubute to create a subclass land
.directive('land', function(){
	return{
		
		require: '?flightdep',
		link: function(s, e, a, c){
			
			c.addTitle('Arrival');
			
			c.addAirport(a.land);
		}
	};
})

//Controller that would help with the registing of the newFlightEvent
.controller('flightEventRegisterCtrl', function(){})


//flightclick attribut to use for remove
.directive('flightclick', function(){
	return {
		
		link: function(scope, element, attr){

			element.bind('click', function(){
				scope.$parent.$apply(attr.flightclick);
			});

		}
	};
})

//Element to create the schedule part
 .directive('flightSchedule', function(){

 	return{
 		restrict: 'E',
 		transclude: true,
 		require: ["^flightView", "^^flightList"],
 		scope: false,
 		templateUrl: 'js/view/flight-schedule.html',
 		
 	}
 })

//The Past flight event element class
.directive('flightPast', function(){
	return{
		restrict:'E',
		templateUrl: 'js/view/flight-past.html',
		controller: ['$scope',function($scope){
			
			this.pastFlightEvents = $scope.pastFlightEvents;
			
			this.addTitle = function(title){
				this.title = title;
			};

			

			
			

		}],
		scope:{
			pastFlightEvents: '=info'
		},
		controllerAs: 'pastCtrl'
	}
})


//Directive to control th click of each past flight event. 
.directive('pastFlightEvent', function(){

	return{
		transclude: true,
		restrict: 'EA',
		replace:'true',
		require: "^flightPast",
		
		templateUrl:'js/view/past-flight-event.html',
		scope: {
			pastFlightEvent: '=info'
		},
		link: function(scope,element,a,c){

			scope.showFlightControllers = false;
			
			scope.madeClick = function(){
				//toggle
				 scope.showFlightControllers = !scope.showFlightControllers;
			
				//Current does not request Server 
				//But would make the call from the flightView Controller see flight view for more info

				scope.pastFlightEvent.someFlightControllers = [{'name':'John Smith'}, {'name':'John Hello'}];
			};
		}
	};
})


