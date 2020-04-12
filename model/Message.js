const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (message) {
    db.prepare('insert into messages (sender_id , receiver_id, date , message) values (@sender_id , @receiver_id, date.now() , @content)').run(message).lastInsertRowid;
    return id;
}