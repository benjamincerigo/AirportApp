Airport App

This assignment was made for Equidam. 

-----
Test App

The prototype app is built using:

Backend:

Apache - PHP Restfull server Silex -- Composer as a package manager-- Heroku deploy

Front End:

Angularjs - (a few modules from Angular used) - Bootstrap -- JQuery to help out

Currently two flights logged. BW123 and BW124. No other code will give you data from the server. 

Deployed here - http://airport-equidam-2709.herokuapp.com/index.html#/search-flight

-----
Full proposed app:
This is the schema for the layers in the Airport app -- (there is more text after the image if it doesnt load go to the README.md file.)

![Alt text](https://github.com/benjamincerigo/AirportApp/blob/master/img/Layers-schema.png "Layer schema")

--
Front end

The Front end of this website will use Angular js. This will create a clear understanding of the behavior of the app and what it contains from the html. In the case of the prototype this can be found in the view.html. 

The main focus of the front-end will be on directives. The parent directive will bind to the model giving each of the children classes the parts of the model that it requires. Events will try to be kept in the children directives unless act on the model in which case they will pass back up either with attributes as functions or with events ($emit).

Within the prototype the parent directive is the flightList. This contains the list of Flights that the users has searched for. The flight info is passed the flightView which uses children directories to iterate over data where needed. 

In the prototype the search gui is set up so that the user can add multiple flights. Creating a tab as each one is successfully queried. Remove the search flight with the link at the top of the flight page

The flightView Gui is made up of the main code and carrier information of the flight. The departure and arrival airports are listed within the child directive flightdep with a button to register the Flight event (either arrival or departure). The button shows the form in which the users can input data. 

In the prototype this form can be submitted and the info put in will be added to the past flights (arrival or departures as selected). The information is not validated so any information can be added. In the real app this information would be validated. In the prototype you can also add any number of flight controllers. This is through the button Add a Flight Controller. There are 5 possible flight controllers C01 - C05. You can also remove once added. There is validation and repeat checks for this list. 

In the full app this registration of the flight would call a save from the Flight Service, and save the information to the database. In the prototype when the registration is submitted the input information is added to the past flight list.  This is to represent what would happen in the real app. In the real app a web socket would be used to sync the past Flight events on the server. In this way when a flight event is successfully saved the past flight events list would show this update. In the real app it would then be much slower and some kind of indication would need to be added so that the user could see that the request was being processed. 

The flight view also has a flightSchedule part. This part show the scheduled flight event from the day that the user selects. The prototype requests each day dynamically updating the view as it does so. 

The pastFlights are listed, separated into departures and arrivals. If the user clicks on a pastFlightEvent panel then the event will dynamically request the data from the server. In the prototype this data is not collected form the server but is just added in the function. Thus it is the same for all requests unless you added your own flight event. In which it contains the data you input. In the full app both lists of pastFlightEvents would be synced with the server in real time. So that if the current client, or another, registers a flightEvent and the outcome is successful. The past Event list will also be update. This real time syncing will be done through Web sockets. More spesifically Pusher or Socket.IO. 


The parent controller has defined services to retrieve data from the RESTfull server. It uses angular-resource to wrap the http request. 

The RESTFUll server retrieves data from the database. In the prototype it uses a fake database in which the data is stored in php variables. But in the full app this would be through sum sort of SQL database. 

The Data Base would be made up of 13 Tables. 

----
Table:flights



flight_id - primary key

carrier - string (varchar(80))

depart_airport - varchar(3) the code of the air port which could be looked up from an auxiliary table. 

arrival_airport - varchar(3)

flighing - boolean


---
Table:departures


datetimestamp - primary key

flight_id - secondary key

lane_used - int


---
Table:arrivals


datetime_stamp - primary key

flight_id - secondary key

lane_used - int

---
Table:flight_controllers


id - varchar(3)

first_name

second_name


---
Each day of the week has its own table. 7 tables in total listed as
Table:monday, Table:tuesday ...


flight_id

time


----
Table:flight_event_controllers 


flight_id

datetime_stamp

controller_id


By using SQL join, combinations of data can be retrieved. 
Such as if the request was for the flight events that a controller worked on could be requested by

url ‘/flight_controller/:controller_id’ from by joining the arrivals and departure to the flight_event_controllers
the flight events of that controller could be returned. 


The app aims to give a usuable application and an improved experience through the Angualr JS. The Database design is an attempt to create a useable database so that query flexible, to a certain extent. From the two the app is created. 


Points of Critique. From Research I have done it seems that the creation of models as Java script object can be useful. Especially in creating a composite model; made up of other models. This however would take more research on my part. 

Some things that did not have time to change. My server was not serving .html files. I could not find out why. THis is why the index is not in a api folder and why you must visit /index.html to view the app. 

















