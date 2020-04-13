const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

exports.validateForm = function(){
    var x = document.forms["TheForm"]["first_name"].value;
    if(x == "")
        return false;
    var x = document.forms["TheForm"]["last_name"].value;
    if(x == "")
        return fale;
    var x = document.forms["TheForm"]["age"].value;
    if(x == "" && typeof(x)== number)
        return false;
    var x = document.forms["TheForm"]["email"].value;
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)))
        return false;
    if(x == "")
        return false;
    var x = document.forms["TheForm"]["password"].value;
    var y = document.forms["TheForm"]["password2"].value;
    if(x == "" || x!=y){
        return false;
    }
        
    var x = document.forms["TheForm"]["description"].value;
    if(x == "")
        return false;
    return true;
}


exports.create =function(formInput){
    var id = db.prepare('insert into users (first_name,last_name,age,email,password,description) VALUES (@first_name,@last_name,@age,@email,@password,@description)').run(formInput).lastInsertRowid;
    return id;
};