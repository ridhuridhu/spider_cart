const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
require('dotenv').config();
// my vars
const port = process.env.PORT || 3000;
const {
  MONGO_URL
} = require('./config/');

// console.log(MONGO_URL);
require('./libs/db-connection');
// configuration
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'abc123',
  resave: true,
  saveUninitialized: true,
  // this prevents that every time the server is restarted we lose the login sessions
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: MONGO_URL,
    autoReconnect: true
  })
}));

app.use(flash());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.errors = [];
  next();
});
// static files
app.use(express.static(path.join(__dirname, '/public')));
app.use("/image/", express.static("./uploads"));

// engine
app.set('view engine', 'jade');
// passport config
require('./config/passport')(passport);

// routes

const buyerRoute = require("./routes/buyer");
const sellerRoute = require("./routes/seller");

app.use(require('./routes/')); // main routes
app.use('/auth', require('./routes/auth')); // user routes
app.use("/buyer", buyerRoute);
app.use("/seller", sellerRoute);
// run server
server.listen(port, () => console.info(`Server on Fire @${port}`));