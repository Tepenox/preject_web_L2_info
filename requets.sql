drop table if exists notifications;
drop table if exists messages;
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
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (owner_id)
       REFERENCES users (id) 
);

CREATE TABLE help_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    helper_id INTEGER NOT NULL,
    request_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    accepted DEFAULT 'false',
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

CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    from_id INTEGER NOT NULL, -- the one who caused the notification
    receiver_id INTEGER NOT NULL, 
    date TEXT NOT NULL,
    FOREIGN KEY (from_id)
       REFERENCES users(id),
    FOREIGN KEY (receiver_id)
        REFERENCES users(id)
);


insert into users (first_name,last_name,age,email,password) values('Anass','EL AFYA',22,'anasselafya@gmail.com','12345678');
insert into users (first_name,last_name,age,email,password) values('Cedric','MASSAT',21,'cedricmassat@gmail.com','12345678');
insert into users (first_name,last_name,age,email,password) values('Nicolas','YAVERIAN',20,'nicolasyaverian@gmail.com','12345678');


insert into help_requests (owner_id, date ,type,title,description) values (1 ,datetime('now'),'Coding',' I need help on some css stuff','Pariatur cupidatat dolor magna tempor anim exercitation sint officia commodo mollit incididunt aute aute. Non aliqua cillum velit esse irure. Adipisicing nulla laborum id reprehenderit officia anim anim dolor et eiusmod ipsum officia et culpa. Tempor excepteur laboris consectetur commodo aliqua non dolor do. Nostrud laborum nostrud excepteur id aliqua dolor adipisicing ex pariatur exercitation quis magna adipisicing.');
insert into help_requests (owner_id, date ,type,title,description) values (2 ,datetime('now'),'Coding','I need help on java stuff','Qui esse eu et consequat voluptate cupidatat elit ad incididunt occaecat nostrud adipisicing consequat magna. Non ex pariatur laborum voluptate eu nisi voluptate reprehenderit. Do irure veniam sit exercitation elit voluptate laborum cillum quis aliquip.');
insert into help_requests (owner_id, date ,type,title,description) values (1 ,datetime('now'),'Gardening','I need help on some gardening','Qui esse eu et consequat voluptate cupidatat elit ad incididunt occaecat nostrud adipisicing consequat magna. Non ex pariatur laborum voluptate eu nisi voluptate reprehenderit. Do irure veniam sit exercitation elit voluptate laborum cillum quis aliquip.');


insert into help_offers (helper_id , request_id , description, date ) values (1,2,'hey i want to help in this one i m anass' ,datetime('now'));
insert into help_offers (helper_id , request_id , description,date ) values (3,2, 'hey i want to help in this one i m nicolas',datetime('now'));
insert into help_offers (helper_id , request_id , description,date ) values (2,1, 'hey i want to help in this one i m cedric',datetime('now'));
insert into help_offers (helper_id , request_id , description, date ) values (3,1, 'hey i want to help in this one i m nicolas',datetime('now'));


insert into messages (sender_id,receiver_id,date,message) values (2,1, '2020-04-12 23:11:19' , "thank you for sending a help offer do you think you can help me ?");
insert into messages (sender_id,receiver_id,date,message) values (1,2, '2020-04-12 23:12:19' , "for sure what seems to be the problem exactly");
insert into messages (sender_id,receiver_id,date,message) values (2,1, '2020-04-12 23:13:19' , "do you know how to convert an List of integer to an Array in java");
insert into messages (sender_id,receiver_id,date,message) values (1,2, '2020-04-12 23:13:20' , "yes just use this toArrayMethode in the list class");
insert into messages (sender_id,receiver_id,date,message) values (3,2, '2020-04-12 23:13:19' , "hey i can offer u help");




-- select messages.id as id , messages.message as message from messages join users on (users.id = messages.sender_id) where (sender_id = 1 and receiver_id = 2) or (sender_id = 2 and receiver_id = 1 ) 
-- select ho.helper_id as helper_id, ho.request_id as request_id ,ho.date as date, hr.title as helpRequestTitle, u.last_name as helperLastName , u.first_name as helperFirstName from help_offers ho join users u on ho.helper_id = u.id join help_requests hr on hr.id = ho.request_id  where request_id in (select id from help_requests where owner_id = 2);