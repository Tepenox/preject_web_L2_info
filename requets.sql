drop table if exists message;
drop table if exists help_offers;
drop table if exists help_requests;
drop table if exists users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    description TEXT
);


CREATE TABLE help_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    description INTEGER NOT NULL,
    FOREIGN KEY (owner_id)
       REFERENCES users (id) 
);

CREATE TABLE help_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    helper_id INTEGER NOT NULL,
    request_id INTEGER NOT NULL,
    FOREIGN KEY (helper_id)
       REFERENCES users(id),
    FOREIGN KEY (request_id)
        REFERENCES help_requests(id)

);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (sender_id)
       REFERENCES users(id),
    FOREIGN KEY (receiver_id)
        REFERENCES users(id)
);


insert into users (first_name,last_name,age,email,password) values('Anass','EL AFYA',22,'anasselafya@gmail.com','12345678');
insert into users (first_name,last_name,age,email,password) values('Cedric','MASSAT',21,'cedricmassat@gmail.com','12345678');


insert into help_requests (owner_id, date ,type,description) values (1 ,datetime('now'),'technology','hi i need help on some css stuff');
insert into help_requests (owner_id, date ,type,description) values (2 ,datetime('now'),'technology','i need help on java stuff');


insert into help_offers (helper_id , request_id) values (1,2);


insert into messages (sender_id,receiver_id,date,message) values (2,1, datetime('now') , "thank you for sending a help offer do you think you can help me ?");

