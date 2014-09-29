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
	
		
	
	

}])




.directive('flightList', function(){
	//flight view list directive
	return{
		restrict: 'E',
		transclude: true,

		templateUrl: 'js/view1/flight-list.html',
		controller: ['$scope', function($scope){
			var flights = $scope.flights = [{'id': 'Search A new flight'}];
			/*console.log("Flight List Crtl scope");
			console.log($scope);
			console.log("Flight List Crtl scope");
			console.log($scope.this);*/

			$scope.searchBool = true
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
		      	console.log(flight.searchBool);
		          
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
		     	 
		     	
		     $scope.addAFlight = function(id){
		     		console.log('called add flight');
					var flight = {'id': id};
					$scope.flights.unshift(flight);
					$scope.select(flight);
					
				};

		     	
		     	
		     	
		     	
				$scope.select(flights[0]);
		     	
		     

			
		}],
		controllerAs: 'flightListCrtl',
		link: function(s, e, a , c){
			/*console.log("flight list scope");
			console.log(s);
			console.log("flight list ctrl");
			console.log(c);*/
		}



		

		
		

	}



})
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
			scope.isValidCode = false;
			scope.repeat = false;
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

			scope.allReadyHave = function(code){
				
				var flights = scope.$parent.flights;
				scope.repeat = false;
				for(var i=0;i<flights.length;i++){
					console.log(flights[i].id);
					console.log(code);
					if(flights[i].id == code){
						console.log('found match');
						scope.repeat = true;

					}else{
						scope.isValidInput = "";
					}
				};

				scope.isValidInput = scope.repeat? "You Already Have this flight":"" ;
						
				


			};
			
			


			
		}


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

		link: function(s, e, a, c){
			
		}
		
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