

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

			$scope.$on('registerEvent', function(event, flightevent){
				var arrayToAdd, copy;
				switch(flightevent.typeOf){
					case 'Departure': 
					
						arrayToAdd = $scope.flight.departures;
						break;
					case 'Arrival':
						arrayToAdd = $scope.flight.arrivals;
						break;
				}
				//This is a botch in the real app it would app to server and not just to the view. 
				//Then we would see beceause of the web socket that would pick up the change in the server. 
				flightevent.tyoeOf = null;
				copy = JSON.parse(JSON.stringify(flightevent)) ;
				
				arrayToAdd.push(copy);
				
				
			})

			/* 
			Things I would add:

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
			var that = this;
			// Boolean to show or hide registering
			this.registering = false;
			
			//From attibutes
			this.addTitle = function(title){
				this.title = title;
				this.buttonText = this.title;
			};
			//From attibutes
			this.addAirport = function(airport){
				this.airport = airport;
			};
			//Does nothing now but shows registering
			this.registerFormShow = function(){

				if(this.registering){
					this.cancelRegister();
				}
				else{
					this.registering = true;
					this.buttonTextCtrl(this.registering);
				}

				
				
			
			};

			this.cancelRegister = function(){
					
					this.registering = false;
					this.buttonTextCtrl(this.registering);
					$scope.$broadcast('cancelRegisterClick');

			};

			this.buttonTextCtrl = function(registering){

				this.buttonText = registering?"Cancel":this.title;

			}
			$scope.$on('registerEvent', function(event, value){
				
				value.typeOf = that.title;
				that.registering = false;
				that.buttonTextCtrl(that.registering);
				
			})
			

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

//Element to register flight event
.directive('flightEventRegister', function(){

	return{
		restrict: 'E',
		templateUrl: 'js/view/flight-eventregister.html',
		scope: {
			
		},
		controller: ['$scope','repeatIdTest', 'FlightController','removeByAttr', function($scope, repeatIdTest, FlightController,removeByAttr){
			var that = this;
			this.registation = {};
			this.registation.flightControllers = [];
			this.plusController = true;
			this.found = false;
			
			this.searchAdd = function(){
				this.plusController = false;

			}
			$scope.$watch('flightEventReg.addcontroller', function(value){
				var repeatTest = repeatIdTest(that.registation.flightControllers, value);
				that.searchError = repeatTest?'You already have this Flight Controller':"";
		 		!(repeatTest) && that.searchController(value);
			});

			this.searchController = function(code){
				
				var pattern, test;
				this.searchError = '';
				if((code != '') || (code != undefined)){
					//vaildate
					pattern = /^\w{1}\d{2}$/;
					test = pattern.test(code);
					if(test){
						this.searchError = 'Searching...';
					FlightController.get({id:code}, function(data){
						that.searchError = null;
						that.foundfc = data;
						
						that.found = true;
					}, function(e){
						that.searchError = 'Not Found';
					});
					}else{
						this.searchError = 'Not correct Code';
					}
				}
				
			}

			this.addController = function(){
				
				this.registation.flightControllers.push(this.foundfc);
				this.foundfc = null;
				this.addcontroller = null;
				this.plusController = true;
				that.found = false;
				

			}

			this.removeAFlightController = function(flightController){
			
				this.registation.flightControllers = removeByAttr(this.registation.flightControllers, 'id', flightController.id);
			}

			this.register = function(){
				
				$scope.$emit('registerEvent', this.registation);
				that.clearForm();
				
				
				
			}

			this.clearForm = function(){
				this.registation.event_date = '';
				this.registation.event_time = '';
				this.registation.lane = '';
				this.registation.flightControllers = [];
			}

			$scope.$on('cancelRegisterClick', function(){
				that.clearForm();
			});

			


		}],
		controllerAs: 'flightEventReg',
	};
})





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
		
		templateUrl:'js/view/past-flightevent.html',
		scope: {
			pastFlightEvent: '=info'
		},
		link: function(scope,element,a,c){

			scope.showFlightControllers = false;
			
			scope.madeClick = function(){
				//toggle
				 scope.showFlightControllers = !scope.showFlightControllers;
			
				//Current does not request Server 
				if(!scope.pastFlightEvent.flightControllers){
				scope.pastFlightEvent.flightControllers = [{'first_name':'John Smith'}, {'first_name':'John Hello'}];
				}
			};
		}
	};
})


