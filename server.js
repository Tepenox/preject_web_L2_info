var express = require('express');
var mustache = require('mustache-express');
var User = require('./model/User');
var HelpRequest = require('./model/HelpRequest');
var HelpOffer = require('./model/HelpOffer')
var Message = require('./model/Message');
var Notification = require('./model/Notifications');
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

const Sqlite = require('better-sqlite3');
var db = new Sqlite('db.sqlite');

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
    var helpRequest = HelpRequest.find(req.params.id);
    var helpOfferWasSent= db.prepare("select * from help_offers where helper_id = ? and request_id = ? ").get(currentUserId,req.params.id);
    if(helpRequest.owner_id == currentUserId){
        helpRequest.isOwnedbyCurrentUser = true;
    }else if(helpOfferWasSent === undefined){
        helpRequest.helpOfferWasntSent = true;
    }else {
        helpRequest.helpOfferWasSent = true;
    }
     
    res.render('help-request-details',helpRequest );

})

app.get('/messages/:id', is_authenticated,(req,res) => {
    Notification.delete({from_id: req.params.id , receiver_id : currentUserId , type: 'message', object_id : -1 }) // deleting corespended message notifications
    var messages = Message.list(currentUserId, req.params.id) // get a list of messages from two user id
    for(message of messages){
        if(message.senderId == currentUserId){
            message.ownedByCurrentUser = true;
        }else{
            message.ownedByCurrentUser = false;
        }
    }
    console.log(messages);
    res.render('messages', {data : messages , receiver : User.get(req.params.id)})


});

app.post('/messages/:id', is_authenticated, (req,res) => {
    var id = Message.create(
        {sender_id: currentUserId , 
        receiver_id : req.params.id ,
        content : req.body.message });
    console.log(id);
    var notification = {from_id : currentUserId , receiver_id : req.params.id , type : 'message' ,object_id : -1};//TODO: add object id 
    Notification.delete(notification); //overwrtie old message notifications if exists
    Notification.create(notification);
    res.redirect('/messages/'+ req.params.id);
    
});

app.get('/help-offers/new/:id',(req,res) => { 
    res.render('help-offers-new',{request_id: req.params.id})
})

app.post('/help-offers/new/:id',(req,res) => { 
    console.log(req.params.id);
    var  requestOwnerId = db.prepare("select owner_id from help_requests where id = ?").get(req.params.id).owner_id;
    var id = HelpOffer.create({helper_id:currentUserId, request_id :req.params.id , description: req.body.description});
    Notification.create({from_id:currentUserId, receiver_id: requestOwnerId ,type:'getHelpOffer',object_id: id});
    res.redirect('/help-requests')
})



app.get('/help-offers',(req,res) =>{
    console.log(HelpOffer.listForUserId(currentUserId));
    res.render("help-offer-list",{data:HelpOffer.listForUserId(currentUserId)});
})

app.get('/help-offers/:id',(req,res) =>{
    var helpOffer = HelpOffer.find(req.params.id);
    var helperId = db.prepare("select helper_id from help_offers where id = ? ").get(req.params.id).helper_id;
    Notification.delete({type:'getHelpOffer' , from_id: helperId ,receiver_id: currentUserId , object_id : req.params.id}); 
    if(helpOffer.accepted == 'true'){
        helpOffer.showAcceptedMessage = true;
    }else{
        helpOffer.showAcceptMessage = true;

    }
    console.log(helpOffer);
    
    res.render("help-offer-details", helpOffer);
})


app.get('/help-offers/:id/accept',(req,res) =>{
    var helpOffer = HelpOffer.find(req.params.id);
    helpOffer.accepted = true;
    console.log(helpOffer);
    Notification.create({from_id: currentUserId , receiver_id: helpOffer.helper_id , type : 'acceptHelpOffer' , object_id: -1});
    HelpOffer.edit(req.params.id,helpOffer);
    res.redirect('/help-offers/'+ req.params.id)
})

app.get('/notifications/',(req,res) =>{
    var notifications = Notification.list(currentUserId);
    for (notification of notifications ){
        if (notification.type === 'message' ){
            notification.isMessageType = true;
        } else if (notification.type === 'getHelpOffer'){
            notification.isGetHelpOfferType = true; 
        } else if (notification.type === 'acceptHelpOffer'){
            notification.isAcceptHelpOfferType = true; 
        }
    }
    res.render('notifications',{data: notifications})
});

app.listen(3000, () => console.log('listening on http://localhost:3000'));
