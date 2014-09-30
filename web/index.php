<?php
date_default_timezone_set('Europe/Amsterdam');
require('../vendor/autoload.php');
$flights= [
  [
    'id'      => 'BW123',
        'carrier'      => 'British Airways',
        'depart_airport' => "AMS",
        'arrival_airport' => "LND",
        'in_flight' => false,
        /*'days' => ['monday', 'wednessday'],
        'time' => "11:00",
        'depatures' => [['09/09/2014', '11:00', 1]],
        'arrivals' => [['09/09/2014', '11:00', 1]],*/
  ],

  [
    'id'      => 'BW124',
        'carrier'      => 'British Airways',
        'depart_airport' => "AMS",
        'arrival_airport' => "LND",
        'in_flight' => false,
        'days' => ['monday', 'thurday'],
        'time' => "12:00", 
        'depatures' => [['09/09/2014', '12:00', 2]],
        'arrivals' => [['09/09/2014', '12:00', 2]],
  ],

  
];

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => './log.log',
));

// Our web handlers

$app->get('/', function() use($app) {
  
});

$app->get('/hello', function() use($app) {
  
  return 'Hello from Server';
});


$app->get('/flight/{id}', function(Silex\Application $app, $id) use($app, $flights) {
  foreach($flights as $array){
  	if($array['id'] == $id){
  		$output = $array;
  	}

  }


  if(!($output)){ $app->abort(404, "Flight $id does not exist.");}
  $app['monolog']->addDebug(json_encode($output));
  return json_encode($output);
});


$app->run();




?>
