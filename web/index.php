<?php

require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => '.log',
));

// Our web handlers

$app->get('/hello', function() use($app) {
  $app['monolog']->addDebug('made a hello');
  return 'Hello from Server';
});


$app->get('/flight/{id}', function(Silex\Application $app, $id) use($app) {
  foreach($flights as $array){
  	if($array['id'] == $id){
  		$output = $array;
  	}

  }
  return $output;
});


$app->run();



$flights= [
	[
		'id'      => 'BW123',
        'carrier'      => 'British Airways',
        'dep' => "Schipol",
        'arr' => "London",
        'days' => ['monday', 'wednessday'],
        'time' => "11:00"
	],

	[
		'id'      => 'BW124',
        'carrier'      => 'British Airways',
        'dep' => "Schipol",
        'arr' => "London",
        'days' => ['monday', 'thurday'],
        'time' => "12:00"
	],

	
]
?>
