'use strict';
console.log('hello');

angular.module('myApp.searchFlight', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-flight', {
    templateUrl: 'js/view1/view1.html',
    controller: 'SearchFlightCrtl'
  });
}])

.controller('SearchFlightCrtl', [function() {

}]);