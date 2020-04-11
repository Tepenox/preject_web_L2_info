"use strict"
//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('database.sqlite');

exports.createUser =function(formInput){
    var id = db.prepare('INSERT INTO users (first_name,last_name,age,email,password,description) VALUES (@first_name,@last_name,@age,@email,@password,@description)').run(formInput).lastInsertRowid;
    return id;
};

exports.createHelpRequest= function (helpRequest) {
  var id = db.prepare("INSERT INTO recipe (owner_id, date, description) VALUES (@owner_id, datetime('now'), @description)").run(helpRequest).lastInsertRowid;
    return id ;
}