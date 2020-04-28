//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');



exports.create =function(formInput){
    var id = db.prepare('insert into users (first_name,last_name,age,email,password,description) VALUES (@first_name,@last_name,@age,@email,@password,@description)').run(formInput).lastInsertRowid;
    return id;
};

exports.connect= function(formInput){
    var id = db.prepare('select id from users where email = @email and password = @password').all(formInput);
    return id.length==0 ? -1 : id[0].id; // to make cleaner
}

exports.getUser = function(id){
    var user = db.prepare('select first_name from users where id = ?').get(id);
    return user.length==0 ? -1 : user.first_name;
}