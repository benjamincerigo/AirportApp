'use strict';

angular.module('myApp.addFlight', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-flight', {
    templateUrl: 'view2/view2.html',
    controller: 'AddFlightCtrl'
  });
}])

.controller('AddFlightCtrl', [function() {

}]);