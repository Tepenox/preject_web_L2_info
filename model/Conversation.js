const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (firstUserId,secondUserId){
    var id = db.prepare(" insert into conversations ( first_user_id , second_user_id ,update_date) values ( ? , ? , datetime('now')) ").run( firstUserId , secondUserId);
    return id ;
}

exports.get = function (first_user_id,second_user_id){
    var conversation = db.prepare("select * from conversations where (first_user_id = ? and second_user_id = ?) or (first_user_id = ? and second_user_id = ?)  ").get(first_user_id,second_user_id,second_user_id,first_user_id);
    return conversation;
}

//update date
exports.update = function (first_user_id,second_user_id) {
    db.prepare("update conversations set update_date = datetime('now') where (first_user_id = ? and second_user_id = ?) or (first_user_id = ? and second_user_id = ?)").run(first_user_id,second_user_id,second_user_id,first_user_id);

}


exports.find = function (userId) {
    var conversations = db.prepare("select * from conversations where first_user_id = ? or second_user_id = ? order by update_date DESC").all(userId,userId);
    return conversations;
}