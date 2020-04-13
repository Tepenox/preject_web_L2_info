const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (helpOffer) {
    var id = db.prepare("insert into help_offers (helper_id, request_id) values (@helper_id, @request_id)").run(helpOffer).lastInsertRowid;
    return id;
}

