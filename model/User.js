//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');



exports.create =function(formInput){
    var id = db.prepare('insert into users (first_name,last_name,age,email,password,description) VALUES (@first_name,@last_name,@age,@email,@password,@description)').run(formInput).lastInsertRowid;
    return id;
};