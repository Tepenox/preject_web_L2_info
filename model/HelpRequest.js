
//traitement base de donnée
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');



exports.create= function (helpRequest) {
  var id = db.prepare(" insert into help_requests (owner_id, date,type,title,description) VALUES (@owner_id, datetime('now'),@type,@title, @description)").run(helpRequest).lastInsertRowid;
    return id;
}

exports.find = function (id){

};

exports.list = function(){
    var requestList = db.prepare('select * from help_requests;').all();
    for (request of requestList ) {
        request.ownerFirstName = db.prepare('select first_name from users where id = ? ').get(request.owner_id).first_name; 
        request.ownerLastName = db.prepare('select last_name from users where id = ? ').get(request.owner_id).last_name;
    }
    return requestList;
};