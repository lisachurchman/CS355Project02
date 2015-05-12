// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var student_route  = require('./controller/student');
var patient_route  = require('./controller/patient');
var doctor_route  = require('./controller/doctor');
var medication_route  = require('./controller/medication');
var operation_route  = require('./controller/operation');


// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Hospital Name');

//configure routes
app.use('/', routes);
app.use('/student', student_route);
app.use('/patient', patient_route);
app.use('/doctor', doctor_route);
app.use('/medication', medication_route);
app.use('/operation', operation_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 8000);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));