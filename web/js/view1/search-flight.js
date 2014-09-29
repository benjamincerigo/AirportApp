'use strict';


angular.module('myApp.searchFlight', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-flight', {
    templateUrl: 'js/view1/view1.html',
    controller: 'SearchFlightCrtl'
  });
}])

.controller('SearchFlightCrtl', ['$scope', function($scope) {
	//Main Contorller For search FLight
	
	$scope.addAFlight = function(id){
		var flight = {'id':id};
		$scope.flights.push(flight);
		$scope.select(flight);
		console.log($scope.flights);
	}

}])

.directive('searchInput',  function(){
	//search-input directive element
	return{
		restrict: 'E',
		scope: {
			search: '&onClick',

		},
		
		templateUrl: 'js/view1/search-input.html'
	}
})


.directive('flightList', function(){
	//flight view list directive
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: 'js/view1/flight-list.html',
		controller: ['$scope', function($scope){
			var flights = $scope.flights = [];


			$scope.select = function(flight) {

		          angular.forEach(flights, function(flight) {
		          	
		            flight.selected = false;
		          });
		          flight.selected = true;
		          
		       };

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

			
		}],
		controllerAs: 'flightListCrtl'

		

		
		

	}



})

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
		
	}

})

.directive('flightclick', function(){
	return {
		
		link: function(scope, element, attr){

			element.bind('click', function(){
				scope.$parent.$apply(attr.flightclick);
			})

		},
	}
})