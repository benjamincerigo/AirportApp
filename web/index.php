<?php

require('../vendor/autoload.php');
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

  
];

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => './log.log',
));

// Our web handlers

$app->get('/', function() use($app) {
  $doc = new DOMDocument();
  $doc->loadHTMLFile("index.html");
  echo $doc-saveHTML();
});

$app->get('/hello', function() use($app) {
  $app['monolog']->addDebug('made a hello');
  return 'Hello from Server';
});


$app->get('/flight/{id}', function(Silex\Application $app, $id) use($app, $flights) {
  foreach($flights as $array){
  	if($array['id'] == $id){
  		$output = $array;
  	}

  }
  if(!($output)){ $app->abort(404, "Flight $id does not exist.");}
  return json_encode($output);
});


$app->run();




?>
