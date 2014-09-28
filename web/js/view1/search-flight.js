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
		console.log(id);
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
		template: '<div></div>'
	}


})