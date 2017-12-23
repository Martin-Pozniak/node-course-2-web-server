/************************************
*File: server,js
*Desc: This file uses the express module to set up a webserver and practice with get requests
*************************************/

/************************************
*Requires
*************************************/
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
/************************************
*Globals
*************************************/
var app = express();
const port = process.env.PORT || 3000; //this is the code that is needed to get heroku to deploy the web app
/************************************
*Middleware stuff and Handlesbars Stuff
*************************************/
hbs.registerPartials(__dirname+"/views/partials");//tells handlebars to allow us to use the partials in the spec dir
app.set('view engine','hbs'); //This line tells express that we want to use handlebars as our view engine

app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log",log+'\n', (err) => {
        if(err) 
            console.log("Unable To Append To Server Log");
    });
    next();
});

// app.use((req,res,next) => { //If this code is uncommented, the maintenance page will display and no other page will be accessible
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname+"/public"));

/************************************
*Handlebars Helper Functions
*************************************/
hbs.registerHelper('getCurrentYear', () => { //because of this helper we can remove the properties in the object below for 'currentYear' and instead inject the helper in our templates
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/************************************
*Express Get Requests
*************************************/
app.get('/', (req,res) => { //individual get requests, the arrow function is a callback
    //res.send('<h1>Hello Express!</h2>');
    // res.send({
    //     name: 'Martin',
    //     likes: ['Swimming, Coding']
    // })
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage: "Welcome To The Home Page. This Message Was Dynamically Created"
    });
});
app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects"
    })
});
app.get('/about', (req,res) => {
    //res.send("<h1>About Page</h1>");
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });//render will render any template we created with the view egnine 'handlebars'
});
app.get('/bad', (req,res) => {
    res.send({
        errMessage: 'Error Handling This Request'
    });
});


/************************************
*Starts the server listening on localhost:3000
*************************************/
app.listen(port, () => {
    console.log(`Server Is Up On Port ${port}!`);
});