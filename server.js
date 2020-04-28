var express = require('express');
var mustache = require('mustache-express');
var User = require('./model/User');
var HelpRequest = require('./model/HelpRequest');
var HelpOffer = require('./model/HelpOffer')
var Message = require('./model/Message');
var app = express();
var methodOverride = require("method-override");

var currentUserId = 2; 

app.use(methodOverride('_method'));

app.use(express.static('/css'));
//app.use(express.static('public'));

//========Session===========
const cookieSession = require('cookie-session');
app.use(cookieSession({
    secret:'password',
}));



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

//========Middleware=============
function is_authenticated(req, res, next){
    if(req.session.id !== undefined){
        console.log('================middleware================');
        res.locals.authenticated = true;
        var user = User.getUser(req.session.id);
        res.locals.first_name=user;
        console.log('connected as '+res.locals.first_name);
        return next();
    }
    res.redirect('/login');
}
app.get('/style.css', (req,res) =>{
    res.sendFile(__dirname+'/css/style.css');
})


app.get('/', is_authenticated, (req,res) => {
    console.log(res.locals.authenticated);
    if(res.locals.authenticated==true){
        res.render('index',{data : res.locals.first_name});
    }else{
        res.redirect('/login');
    }
});

app.get('/login',(req,res) => {
    res.render('login');
});

app.post('/login',(req,res) =>{
    var id = User.connect(req.body);
    if(id == -1){
        res.redirect('/login');
    }
    else{
        console.log('connected');
        req.session.id = id;
        res.redirect('/');
    }
})

app.get('/logout',(req,res) =>{
    req.session = null;
    res.render('logout');
})

app.get('/signup',(req,res) => {
    console.log("goto signup page");
    res.render('signup');
});

app.post('/signup',(req,res) =>{
    console.log(req.body);
    var id = User.create(req.body);
    console.log("created with id = " + id);
    res.render('index');
})

app.get('/help-requests', is_authenticated, (req,res) => {
    
    console.log(HelpRequest.list());
    res.render('help-request-list', {data: HelpRequest.list()});
});

app.get('/help-requests/new', is_authenticated,(req,res) => {
    res.render('new-help-request-form');
});

app.post('/help-requests', is_authenticated,(req,res) => {
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


app.get('/help-requests/:id', is_authenticated,(req,res) => {
    console.log(HelpRequest.find(req.params.id));
    res.render('help-request-details', HelpRequest.find(req.params.id));

})

app.get('/messages/:id', is_authenticated,(req,res) => {
    var messages = Message.list(currentUserId, req.params.id) // get a list of messages from two user id
    for(message of messages){
        if(message.senderId == currentUserId){
            message.ownedByCurrentUser = true;
        }else{
            message.ownedByCurrentUser = false;
        }
    }
    console.log(messages);
    res.render('messages', {data : messages , receiverId : req.params.id})


});

app.post('/messages/:id', is_authenticated, (req,res) => {
    var id = Message.create(
        {sender_id: currentUserId , 
        receiver_id : req.params.id ,
        content : req.body.message });
    console.log(id);
    res.redirect('/messages/'+ req.params.id);
    
});

app.post('/help-offers/new/:id',(req,res) => { // Todo add message
    var id = HelpOffer.create({helper_id:currentUserId, request_id :req.params.id });
    console.log(id);
    res.redirect('/help-requests')
})

app.get('/help-offers',(req,res) =>{
    console.log(HelpOffer.listForUserId(currentUserId));
    res.render("help-offers-list",{data:HelpOffer.listForUserId(currentUserId)});
})

app.get('/help-offers/:id',(req,res) =>{
    console.log(req.params.id);
    res.render("help-offer-details", HelpOffer.find(req.params.id));
})
app.listen(3000, () => console.log('listening on http://localhost:3000'));
