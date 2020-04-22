var express = require('express');
var multer = require('multer');
var app = express();
var path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var upload = multer();

const port = 3000;
//imports the things.js module
var things = require('./things.js');
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
   res.render('form');
});

//Example of 2 parameter route handle, sends inputted params
/* app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 }); */

//Same as above but with 1 parameter with regex restrictions
 /* app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
 }); */

 //Example of middleware function that just console.logs date of access of /things
 /* app.use('/things', function(req, res, next){
    console.log("A request for things received at " + Date.now());
    next();
 });

 //Basic example of /things route
 app.get('/things', function(req, res){
    res.send('Things');
 });
 */
 
//Basic example of returning 1 inputted parameter (no restrictions)
/* app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
    
 }); */

//app.use('/things', things);

/* app.get('/', (req, res) => {
    res.send("hello world");
});

//Just returns this send when /hello accessed
app.get('/hello', (req, res) => {
    res.send("hello world bitch");
});

//Response to post request at /hello
app.post('/hello', (req, res) => {
    res.send("You just called teh post method at '/hello'!\n");
});

//example of all function that responds to all types of HTTP request at /test
app.all('/test', (req, res, next) => {
    res.send("HTTP method doesn't have any effect on this route!");
    next();
}); */

//First middleware before response is sent
app.use(function(req, res, next){
    console.log("Start");
    next();
 });
 
//To parse URL encoded data
//app.use(bodyParser.urlencoded({ extended: false }))
//parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))


//To parse json data
app.use(bodyParser.json())

//Allow static pages
//app.use(express.static('public'));
app.use(express.static('images'));

//Virtual pathing -- /static/ redirects to public directory
app.use('/static', express.static('public'));

//test loading normal static page
app.get('/statictest', (req, res) => {
    res.sendFile(path.join(`${__dirname}/test.html`));
});

app.get('/first_template', function(req, res){
    res.render('first_view');
 });

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
        name: "TutorialsPoint", 
        url:"http://www.tutorialspoint.com"
    });
});

app.get('/components', function(req, res){
    res.render('content');
});

 //Route handler
 /* app.get('/', function(req, res, next){
    res.send("Middle");
    next();
 });
 
 app.use('/', function(req, res){
    console.log('End');
 }); */

app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
console.log(req.body);
res.send("recieved your request!");
});

app.get('*', (req, res) => {
    res.send("sorry this is an invalid URL");
});

app.listen(3000);