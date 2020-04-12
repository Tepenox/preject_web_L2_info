var express = require('express');
var mustache = require('mustache-express');
var model = require('./model');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


app.get('/',(req,res) => {
    res.render('index');
});

app.get('/login',(req,res) => {
    res.render('login');
});

app.get('/signup',(req,res) => {
    res.render('signup');
});

app.post('/signup',(req,res) =>{
    console.log(req.body);
    var id = model.createUser(req.body);
    console.log("created with id = " + id);
    res.render('index');
})

app.get('/request-help-form',(req,res) => {
    res.render('request-help-form');
});

app.post('/request-help-form',(req,res) => {
    console.log("you are in post route ")
    console.log(req.body);
    res.end();
    // res.redirect("/request-help-form");
});



app.listen(3000, () => console.log('listening on http://localhost:3000'));
