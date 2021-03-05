var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var customMdw = require('./middleware/custom');

var graphqlRouter = require("./routes/graphql");
var auth = require('./routes/user/auth');
var register = require('./routes/user/register');
var user = require('./routes/user/user');
// var instagramAuth = require('routes/instagram/auth');
// var authNoToken = require('./routes/authNoToken');

/* Importing passport and configuration */
const passport = require('passport');
require('./passport');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use('/auth', auth);
app.use('/register', register);

//Instagram
// app.use('/instagram', instagramAuth);

app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use("/graphql", passport.authenticate('jwt', {session: false}), graphqlRouter);
// app.use('/authNoToken', authNoToken);

// Handling errors
app.use(customMdw.errorHandler);
app.use(customMdw.notFoundHandler);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
