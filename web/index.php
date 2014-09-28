<?php
?>
<!DOCTYPE html>

<html lang="en" ng-app="myApp" class="no-js"> 
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Airport</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    
  
  <link rel="stylesheet" href="js/dep/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/app.css"/>
</head>
<body >
  <header>
    <h1>Airport</h1>
  </header>
  <ul class="nav nav-tabs">
    <li class='active'><a href="#/search-flight">Search Flight</a></li>
    <li><a href="#/add-flight">Add flight</a></li>
  </ul>

  
  <div ng-app='myApp'>
      <ng-view></ng-view>
  </div>

  <div>Angular seed app: v<span app-version></span></div>

  
  
  <script src="js/dep/jquery/dist/jquery.min.js"></script>
  <script src="js/dep/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="js/dep/angular/angular.js"></script>
  <script src="js/dep/angular-route/angular-route.js"></script>
  <script src="js/dep/angular/angular-resource.min.js"></script>
  <script src="js/app.js"></script>
  <script src="js/services/services.js"></script>
  <script src="js/view1/search-flight.js"></script>
  <script src="js/view2/add-flight.js"></script>
  <script src="js/components/version/version.js"></script>
  <script src="js/components/version/version-directive.js"></script>
  <script src="js/components/version/interpolate-filter.js"></script>
</body>
</html>
