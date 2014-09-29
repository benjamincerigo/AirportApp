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

		     this.removeFlight = function(flight){
		     	/*var position = $.inArray(flight.id, flights);
		     	if(position) flights.slice(position, 1);*/

		     	
		     }

			
		}],

		

		
		

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
			
		},
		link: function(scope, element, attrs, flListCrtl){
			
			
		}

	}

})