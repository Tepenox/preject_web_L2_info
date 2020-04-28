const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (notification)  {
    var id = db.prepare("insert into notifications (type , from_id , receiver_id , date , object_id) values (@type , @from_id , @receiver_id , datetime('now'), @object_id)").run(notification).lastInsertRowid
    return id;
}

//lists notifications unssen meant for a userId
exports.list = function (userId){
    var notifications = db.prepare("select  n.id , n.type , n.from_id , n.receiver_id , n.date , n.object_id as object_id , u.last_name as fromUserLastName, u.first_name as fromUserFirstName from notifications n join users u on from_id = u.id where receiver_id = ?  ").all(userId);
    return notifications;
}

exports.delete = function(notification){
    db.prepare("delete from notifications where from_id = @from_id and receiver_id = @receiver_id and type = @type and object_id = @object_id ").run(notification);

}

// insert into notifications (type,from_id , receiver_id ,date) values ();