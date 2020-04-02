var express = require('express');
var mustache = require('mustache-express');


var app = express();
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

app.listen(3000, () => console.log('listening on http://localhost:3000'));
