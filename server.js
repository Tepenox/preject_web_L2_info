var express = require('express');
var mustache = require('mustache-express');
var User = require('./model/User');
var HelpRequest = require('./model/HelpRequest');
var Message = require('./model/Message');
var app = express();
var methodeOverride = require("method-override");

var currentUserId = 1; 

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
    var id = User.create(req.body);
    console.log("created with id = " + id);
    res.render('index');
})

app.get('/help-requests', (req,res) => {
    
    console.log(HelpRequest.list());
    res.render('help-request-list', {data: HelpRequest.list()});
});

app.get('/help-requests/new',(req,res) => {
    res.render('new-help-request-form');
});

app.post('/help-requests',(req,res) => {
    console.log(req.body);
    var helpRequest = {
        owner_id : currentUserId,
        title : req.body.title,
        type : req.body.type,
        description :req.body.description,
    }
    var id = HelpRequest.create(helpRequest);
    console.log(id);
    res.redirect('/help-requests');
    // res.redirect("/request-help-form");
});


app.get('/help-request/:id',(req,res) => {
    console.log(HelpRequest.find(req.params.id));
    res.render('help-request-details', HelpRequest.find(req.params.id));

})

app.get("/messages/:id", (req,res) => {
    var messages = Message.list(currentUserId, req.params.id) // get a list of messages from two user id
    for(message of messages){
        if(message.senderId == currentUserId){
            message.ownedByCurrentUser = true;
        }else{
            message.ownedByCurrentUser = false;
        }
    }
    console.log(messages);
    res.render('messages', {data : messages})


});


app.listen(3000, () => console.log('listening on http://localhost:3000'));
