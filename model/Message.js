const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (message) {
    db.prepare('insert into messages (sender_id , receiver_id, date , message) \
        values (@sender_id , @receiver_id, date.now() , @content)').run(message).lastInsertRowid;
    return id;
}

exports.list = function (curentUserId , otherUserId) {
    var messageList = db.prepare ('select m.id as id , m.message as message , u.first_name as firstName, u.last_name as lastName , m.date as date from messages m join users u on (u.id = m.sender_id) where (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ? )' ).all(curentUserId,otherUserId,otherUserId,curentUserId);
    
    // messageList.curentUserFirstName = db.prepare('select first_name from users where id = ? ').get(curentUserId).first_name; 
    // messageList.curentUserLastName = db.prepare('select last_name from users where id = ? ').get(curentUserId).last_name;
    // messageList.otherUserFirstName = db.prepare('select last_name from users where id = ? ').get(otherUserId).first_name;
    // messageList.otherUserLastName = db.prepare('select last_name from users where id = ? ').get(otherUserId).last_name;
    
    return messageList;
    
}