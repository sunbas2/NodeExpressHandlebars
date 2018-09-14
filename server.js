// REQURIED TO GET SERVER RUNNING
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

// CONNECT ON PORT 5000
var PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());

// SET VIEWS ENGINE TO HANDLEBARS 
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

// ROUTES AND SERVER ACCESS
var routes = require('./controllers/burgers_controller');
app.use(routes);

// LISTEN/START SERVER 
app.listen(PORT, ()=>{
    console.log(`Port Connected: ${PORT}`);
});