const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (message) {
    var id = db.prepare("insert into messages (sender_id , receiver_id, date , message) values (@sender_id , @receiver_id, datetime('now') , @content);").run(message).lastInsertRowid;
    return id;
}

exports.list = function (curentUserId , otherUserId) {
    var messageList = db.prepare ('select m.id as id , m.message as message ,u.id as senderId, u.first_name as senderFirstName, u.last_name as senderLastName , m.date as date from messages m join users u on (u.id = m.sender_id) where (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ? ) order by date' ).all(curentUserId,otherUserId,otherUserId,curentUserId);    
    return messageList;
    
}