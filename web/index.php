<?php
date_default_timezone_set('Europe/Amsterdam');
require('../vendor/autoload.php');

//Array of Flights
//This is not how the Data base would be set up see Database set up for that. 
$flights= [
  [
    'id'      => 'BW123',
        'carrier'      => 'British Airways',
        'depart_airport' => "AMS",
        'arrival_airport' => "LND",
        'in_flight' => false,
        'departures' => array(
          array(
          'event_date' => '09/09/2014',
           'event_time' =>' 12:00', 
           'lane'=>2
           ),
            array(
          'event_date' => '09/09/2014',
           'event_time' =>' 16:30', 
           'lane'=>2
           ),
        ),
        'arrivals' => array(
          array(
          'event_date' => '09/09/2014',
           'event_time' =>' 12:00', 
           'lane'=>2
           ),
          array(
          'event_date' => '09/09/2014',
           'event_time' =>' 16:30', 
           'lane'=>2
           ),
          )
  ],

  [
    'id'      => 'BW124',
        'carrier'      => 'British Airways',
        'depart_airport' => "AMS",
        'arrival_airport' => "LND",
        'in_flight' => false,
        'departures' => array(
          array(
          'event_date' => '09/09/2014',
           'event_time' =>' 12:00', 
           'lane'=>1
           ),
            array(
          'event_date' => '09/09/2014',
           'event_time' =>' 16:30', 
           'lane'=>1
           )
           ),
        'arrivals' => array(
          array(
          'event_date' => '09/09/2014',
           'event_time' =>' 08', 
           'lane'=>1
           ),
            array(
          'event_date' => '09/09/2014',
           'event_time' =>' 17:30', 
           'lane'=>1
           )
           ),
  ],

  
];

//Day Database

$days = array(
        'Monday'=>array(
          array('BW123' => '10:00'),
          array('BW123' => '14:00'),
          array('BW124' => '12:00'),
          array('BW124' => '16:00')

          ),
        'Tuesday'=>array(
          array('BW123' => '10:10'),
          array('BW123' => '14:10'),
          array('BW124' => '12:10'),
          array('BW124' => '16:10')

          ),
        'Wednesday'=>array(
          array('BW123' => '10:20'),
          array('BW123' => '14:20'),
          array('BW124' => '12:20'),
          array('BW124' => '16:00')

          ),
        'Thursday'=>array(
          array('BW123' => '10:20'),
          array('BW123' => '14:30'),
          array('BW124' => '12:00'),
          array('BW124' => '16:00')

          ),
        'Monday'=>array(
          array('BW123' => '10:00'),
          array('BW123' => '14:00'),
          array('BW124' => '12:30'),
          array('BW124' => '16:00')

          ),
        'Friday'=>array(
          array('BW123' => '10:00'),
          array('BW123' => '14:30'),
          array('BW124' => '12:00'),
         array( 'BW124' => '16:00')

          ),
        'Saturday'=>array(
          array('BW123' => '10:00'),
          array('BW123' => '14:00'),
          array('BW124' => '12:00'),
          array('BW124' => '16:30')

          ),
        'Sunday'=>array(
          array('BW123' => '10:30'),
          array('BW123' => '14:30'),
          array('BW124' => '12:30')
          

          ),

  );

$flightContollers = array(
      array(
        'id' => 'C01',
        'first_name' => 'John',
        'last_name' => 'Smith'
        ),
      array(
        'id' => 'C02',
        'first_name' => 'Lucy',
        'last_name' => 'Smith'
        ),
      array(
        'id' => 'C03',
        'first_name' => 'Harry',
        'last_name' => 'Smith'
        ),
      array(
        'id' => 'C04',
        'first_name' => 'Marry',
        'last_name' => 'Smith'
        ),
      array(
        'id' => 'C05',
        'first_name' => 'Albert',
        'last_name' => 'Smith'
        )
      );


//Set up app

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => './log.log',
));

// Our web handlers

$app->get('/', function() use($app) {
  //Nothing
});



//GET the Flight from the $flights array using the id
$app->get('/flight/{id}', function(Silex\Application $app, $id) use($app, $flights) {

  //Find istance of the flight
  foreach($flights as $array){
  	if($array['id'] == $id){
  		$output = $array;
  	}

  }

  if(!($output)){ $app->abort(404, "Flight $id does not exist.");}
  $app['monolog']->addDebug(json_encode($output));
  return json_encode($output);
});


//Get the schefuled flights for that day and flight number
$app->get('/schedule/{day}/{id}', function(Silex\Application $app, $day, $id) use($app, $flights, $days) {
  //Set up variables
  $output = array();
  $dayName = findDayName($day);
  //Find the Day array
  $daySchedule = $days[$dayName];
  
  //Find all the instance of the flight code
  foreach($daySchedule as $array){
      
      if (isset($array[$id])) {
        
        $output[] = $array[$id];
        $app['monolog']->addDebug(json_encode($output));
    }
  
  }


    //if error aport
  if(!($output)){ $app->abort(404, "Sorry Your request could not be found");}
  //return json
  return json_encode($output, 128);
});

$app->get('/flightcontroller/{id}', function(Silex\Application $app, $id) use($app, $flightContollers) {

  //Find istance of the flightContorller
  $app['monolog']->addDebug('flightContollers ' + $id);
  foreach($flightContollers as $array){
    if($array['id'] == $id){
      $output = $array;
    }

  }

  if(!($output)){ $app->abort(404, "Contoller $id does not exist.");}
  $app['monolog']->addDebug(json_encode($output));
  return json_encode($output);
});

$app->run();


//Functino to change the day number into day name
function findDayName($day){
  switch($day){
    case '0':
        $dayName = 'Sunday';
        break;
    case '1':
        $dayName = 'Monday';
        break;
    case '2':
        $dayName = 'Tuesday';
        break;
    case '3':
        $dayName = 'Wednesday';
        break;
    case '4':
        $dayName = 'Thursday';
        break;
    case '5':
        $dayName = 'Friday';
        break;
    case '6':
        $dayName = 'Saturday';
        break;
  }
  return $dayName;
}


?>
