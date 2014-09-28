'use strict';


angular.module('myApp.searchFlight', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-flight', {
    templateUrl: 'js/view1/view1.html',
    controller: 'SearchFlightCrtl'
  });
}])

.controller('SearchFlightCrtl', function() {

})

.directive('searchInput',  function(){

	return{
		restrict: 'E',
		controller: ['myFactory', function(myFactory){
			this.search = {}
			this.printOut = function () {
				
				console.log(myFactory);
			};

			
			


		}],
		controllerAs: 'sInput',
		templateUrl: 'js/view1/search-input.html'
	}
})
