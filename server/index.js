// ============== DEPENDENCIES =============== //
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// ============== INITIALIZE EXPRESS APP & SETUP FOR DATA PARSING===============//
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// ============== AUTHENTICATION PACKAGES =============== //
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('connect-flash')

// ============== DATABASE PACKAGES & CONFIG =============== //
const mongoose = require('mongoose')
const configDB = require('./config/database.js')
// const users = require('./models/Users');
mongoose.Promise = Promise
mongoose.connect(configDB.url)

// ============== PASSPORT CONFIGURATION =============== //
require('./config/passport')(passport) // pass passport for configuration

// ============== AUTHENTICATION SETUP =============== //
app.use(cookieParser())

app.use(
  session({
    secret: 'sdlfkjdlajsdoijajk',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//= ============== SERVE STATIC ASSETS ===============//
app.use(express.static(path.resolve(__dirname, '..', 'build')))

//= ============== ROUTES SETUP ===============//
require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport
require('./app/githubRoutes.js')(app)
require('./app/testRoutes.js')(app)

//= ============== API ROUTES ===============//
app.get('/api/test', (req, res) =>
  res.json({ id: 1, first: 'hello', last: 'world' })
)
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

//= ============== STARTING THE SERVER ===============//
const server = app.listen(port, () =>
  console.log('App listening on PORT ' + port)
)
require('./sockets')(server)
