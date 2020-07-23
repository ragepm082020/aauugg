let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser');//,   debug = require('debug')('http');
   const favicon = require('express-favicon');
   //let favicon = require('serve-favicon')
  // dbConfig = require('./database/ProjectMgmt'); 
  //if (debug.enabled) { console.log('Debug enabled'); }

  // Connecting with mongo db
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/ProjectMgmt', {   useNewUrlParser: true, useUnifiedTopology: true}).then(() => {      console.log('Database sucessfully connected')   },
  // error => {  console.log('Database could not connected: ' + error)   })
mongoose.connect('mongodb+srv://user1:VgGAxgt1bXc4Mfsp@cluster0-94bts.mongodb.net/pmJuly2020?retryWrites=true&w=majority', {   useNewUrlParser: true, useUnifiedTopology: true}).then(() => {      console.log('Database sucessfully connected')   },
  error => {  console.log('Database could not connected: ' + error)   })

// Setting up port with express js
const projectRoute = require('../backend/routes/projects.route');//('../backend/routes/employee.route')
const userRoute = require('../backend/routes/users.route');
//const projectIssuesRoute = require('../backend/routes/projectIssues.route');
//const notificationsRoute = require('../backend/routes/notifications.route');
const notifyRoute = require('../backend/routes/notify.route');
const employeesRoute = require('../backend/routes/employees.route');
const issueActivityRoute = require('../backend/routes/issueActivity.route');
const projIssRoute = require('../backend/routes/projIss.route');
//const projectIssueActivityRoute = require('../backend/routes/projectIssueActivity.route');
//const piaRoute = require('../backend/routes/pia.route');

const app = express();

//app.use(favicon(path.join('', 'public', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({   extended: false}));
app.use(cors()); 
app.use(favicon('favicon.ico'));

app.use('/backend', projectRoute);
app.use('/backend/user', userRoute); //app.use('/backend/projectIssues', projectIssuesRoute);
//app.use('/backend/notifications', notificationsRoute);
app.use('/backend/notify', notifyRoute);
app.use('/backend/emp', employeesRoute);
app.use('/backend/issueActivity', issueActivityRoute);
app.use('/backend/projIss', projIssRoute);
//app.use('/backend/projectIssueActivity', projectIssueActivityRoute);
//app.use('/backend/pia', piaRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {   console.log('Connected to port --->' + port);  })

// Find 404 and hand over to error handler
app.use((req, res, next) => {   next(createError(404));});

app.get('/error', (req, res) => res.send(error)()) 

app.use(function (err, req, res, next) {// error handler
  console.error(err.message);   // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  //res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
  res.send('Internal server error 500')
});