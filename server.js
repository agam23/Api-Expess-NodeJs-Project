// all "require" better to include all at top
require('dotenv').config()

var express = require('express')
var morgan = require('morgan')

var app = express()
app.use(morgan('combined'))
app.use(express.json({
    limit: '10mb',
    extended: true
}));

var router = require('./routes/main-route')

//static folder (e.g. css files)
app.use('/public', express.static('public'))

//all your routes
app.use('/', router);

//templating engine
app.set('view engine', 'pug')

//setting port
var port = process.env.PORT || 8080;

//start listening at the configured port
app.listen(port, '0.0.0.0', "localhost", () => {
    console.log("Listning at port: " + port)
});