
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var testprint = require('./routes/testprint');
var http = require('http');
var path = require('path');
var fs = require('fs');
var db = require('./model.js');
var MongoStore = require('connect-mongo')(express);

var logFile = fs.createWriteStream('./express.log', {flags: 'a'});

/* passportの設定 */
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

// Passport: TwitterのOAuth設定
passport.use(new TwitterStrategy({
  consumerKey: "A8ax5e7r9W0hVNLCWOFCTGuvF",
  consumerSecret: "H4BHJGaJJ2mED3xid69tnIXvLorZNDt9rxW7Xegr41nffY8xZY",
  callbackURL: "/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  // ユーザIDを設定
  profile.uid = profile.provider + profile.id;
  process.nextTick(function() {
    return done(null, profile);
  });
}));

passport.use(new GoogleStrategy({
  clientID: '721775049360.apps.googleusercontent.com',
  clientSecret: 'SRonosDmByHXy3N3Cn482qmK',
  callbackURL: "http://exp04.dai-tokai.okayama.jp/auth/google/callback"
}, function(accessToken, refreshToken, profile, done){
  // ユーザIDを設定
  profile.uid = profile.provider + profile.id;
  process.nextTick(function() {
    return done(null, profile);
  });
}));

passport.use(new FacebookStrategy({
    clientID: '668004543253145',
    clientSecret: '5c4891ed5d9f4c9b324d90daaffc5956',
    callbackURL: "http://exp04.dai-tokai.okayama.jp/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, done){
  // ユーザIDを設定
  profile.uid = profile.provider + profile.id;
  process.nextTick(function() {
    return done(null, profile);
  });
}));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Define a middleware function to be used for every secured routes
// 認証が通っていないところは401を返す
var auth = function(req, res, next){
  if (!req.isAuthenticated()) {
    console.log('not auth');
    res.redirect('/login');
    return false;
  } else {
    console.log('authed');
    next();
  }
};

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3002);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.cookieParser());
  app.use(express.bodyParser());

  // app.use(express.favicon());
  app.use(express.logger({stream: logFile}));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

  // OAuth認証用
  app.use(express.session({ secret: 'oso2014', cookie: {maxAge: 1000 * 60 * 60 * 24 * 30} }));
  app.use(passport.initialize()); // Add passport initialization
  app.use(passport.session());    // Add passport initialization

  app.use(app.router);
});

var hostname = app.request;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route to log in
app.get("/auth/twitter", passport.authenticate('twitter'));
app.get("/auth/twitter/callback", passport.authenticate('twitter', {
  successRedirect: '/auth',
  falureRedirect: '/login'
}));

app.get("/auth/google", passport.authenticate('google', {
 scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'] })
);
app.get("/auth/google/callback", passport.authenticate('google', {
  successRedirect: '/auth',
  falureRedirect: '/login'
}));

app.get("/auth/facebook", passport.authenticate('facebook'));
app.get("/auth/facebook/callback", passport.authenticate('facebook', {
  successRedirect: '/auth',
  falureRedirect: '/login'
}));

app.get('/login', login.index);

app.get('/',  auth, routes.index);
app.get('/auth', routes.authlogin);
app.get('/user',db.getUser);
app.post('/setUser',db.setUserData);
app.get('/getweight',db.getWeight);
app.get('/getweightlist',db.getWeightList);
app.post('/setweight',db.setWeight);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('---------------------------------------');
});
