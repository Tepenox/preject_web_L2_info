"use strict"
//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

exports.createUser =function(formInput){
    var id = db.prepare('insert into users (first_name,last_name,age,email,password,description) VALUES (@first_name,@last_name,@age,@email,@password,@description)').run(formInput).lastInsertRowid;
    return id;
};

exports.createHelpRequest= function (helpRequest) {
  var id = db.prepare(" insert into help_requests (owner_id, date,  type ,description) VALUES (@owner_id, datetime('now'),@type, @description)").run(helpRequest).lastInsertRowid;
    return id ;
}