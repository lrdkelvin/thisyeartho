//Dependencies
require("dotenv").config();
//Express
var express = require("express");
//Passport for the login system
var passport = require('passport');
//Express session for the login system
var session = require('express-session');
//BodyParser for the login system
var bodyParser = require('body-parser');
var axios = require('axios');
var popupS = require("popups");

//requiring the models for our db
var db = require("./models");

//setting up Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware for Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//Middleware for BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware for session
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
//requiring our api and html routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app,passport);

//passport strategies
require('./config/passport/passport.js')(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models 
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
