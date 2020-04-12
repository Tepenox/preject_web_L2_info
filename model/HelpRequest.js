
//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');



exports.create= function (helpRequest) {
  var id = db.prepare(" insert into help_requests (owner_id, date,  type ,description) VALUES (@owner_id, datetime('now'),@type, @description)").run(helpRequest).lastInsertRowid;
    return id;
}

exports.find = function (id){

};

exports.list = function(){
    var list = db.prepare('select * from help_requests;').all();
    return list;
};