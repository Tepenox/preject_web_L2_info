const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.create = function (helpOffer) {
    var id = db.prepare("insert into help_offers (helper_id, request_id,date) values (@helper_id, @request_id, datetime('now'))").run(helpOffer).lastInsertRowid;
    return id;
}

//list helpoffers recived by a user
exports.list = function ( userId ){
    var helpRequestsOfaUser = db.prepare("select ho.helper_id as helper_id, ho.request_id as request_id ,ho.date as date, hr.title \
    as helpRequestTitle, u.last_name as helperLastName , u.first_name as helperFirstName from help_offers ho join users u \
    on ho.helper_id = u.id join help_requests hr on hr.id = ho.request_id  where request_id in (select id from help_requests where owner_id = ?);")
    .all(userId);
    return helpRequestsOfaUser;
}

