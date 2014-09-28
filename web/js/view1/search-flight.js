'use strict';

angular.module('myApp.searchFlight', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-flight', {
    templateUrl: 'view1/view1.html',
    controller: 'SearchFlightCrtl'
  });
}])

.controller('SearchFlightCrtl', [function() {

}]);