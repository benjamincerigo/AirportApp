'use strict';


angular.module('myApp.searchFlight', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-flight', {
    templateUrl: 'js/view1/view1.html',
    controller: 'SearchFlightCrtl'
  });
}])

.controller('SearchFlightCrtl', ['$scope', function($scope) {
	//Top Contoller for the web app Not needed currently
	
}])
//Element which controls te flight list. 
.directive('flightList', function(){
	//flight view list directive
	return{
		restrict: 'E',
		transclude: true,

		templateUrl: 'js/view1/flight-list.html',
		controller: ['Flight', '$scope', function(Flight,$scope){

			var flights;
			//flights Variable: initialed with Extra Flight of Search A new flight
			flights = $scope.flights = [{'id': 'Search A new flight'}];
			
			//Used to Show Seach
			$scope.searchBool = true
			//Select a tab and Show FLight
			$scope.select = function(flight) {

				angular.forEach(flights, function(flight) {
		          	$scope.searchBool = false;
		            flight.selected = false;
		          });
				
				
				if(flight.id == 'Search A new flight'){
					$scope.searchBool = true;
				}else{
		          
		          flight.selected = true;
		      	}
		      	
		          
		       };

		       //Remove a Flight from Tab
		     $scope.removeFlight = function(flight){
		     	
		     	console.log("remove From Controller");
		     	console.log(flights);
		     	var position =  flights.indexOf(flight);
		     	for(var i=0; i < flights.length; i++){
		     		if(flights[i].id == flight.id){
		     			flights.splice(i, 1);
		     		}
		     		};
		     		console.log(flights);
		     		

		     	};
		     	 
		     //Add a Flight 
		     $scope.addAFlight = function(id){
		     		console.log('called add flight');
					var flight = {'id': id};
					
					//Use service to get the flight from the server
					Flight.get({id: id}, function(data){
						console.log(data);
						$scope.flights.unshift(data);
						$scope.select(data);
						$scope.$broadcast('FoundFlight');
					}, function(e){
						
						$scope.$broadcast('notFound');
					}); 
					
				};

		     	//
				$scope.select(flights[0]);
		     	
		     

			
		}],
		controllerAs: 'flightListCrtl',
	}



})

//search-input 
.directive('searchInput',  function(){
	//search-input directive element
	return{
		restrict: 'E',
		require: "^flightList",
		scope: {
			succesSubmit: '&onSubmit',
			searchBool: '=toShow'
		},
		templateUrl: 'js/view1/search-input.html',
		link: function(scope, element, attr, ctrl){

			//Vailat Varibles
			scope.isValidCode = false;
			scope.repeat = false;

			//watch the input to see if valid code is entered
			//This should be moved into a Service
			scope.$watch('flightCode', function(code){
				var pattern, test;
				
				if(code != ""){
					
					pattern = /^\w{2}\d{3,5}$/;
					test = pattern.test(code);
					if(!test){ 
						scope.isValidInput = "Your flight code is not valid";
					}else{
						scope.isValidInput = "";
					}
					scope.isValidCode = test;
					

					
				}else{
					scope.isValidInput = "";
				}
			});

			//See if already have the Flight code
			scope.allReadyHave = function(code){
				
				var flights = scope.$parent.flights;
				scope.repeat = false;
				for(var i=0;i<flights.length;i++){
				
					if(flights[i].id == code){
						console.log('found match');
						scope.repeat = true;

					}else{
						
					}
				};
				// Out put Error
				scope.isValidInput = scope.repeat? "You Already Have this flight":"Loading..." ;
						
				


			};
			//Watch for founf and not founf events
			scope.$on('notFound', function(){scope.isValidInput = "Sorry Your Fligth was not found"});
			scope.$on('FoundFlight', function(){
				scope.flightCode = '';
				scope.isValidInput = '';

			});

			
		}

	}
});


