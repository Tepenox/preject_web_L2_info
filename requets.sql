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
    title TEXT NOT NULL,
    description TEXT NOT NULL,
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


insert into help_requests (owner_id, date ,type,title,description) values (1 ,datetime('now'),'Coding',' I need help on some css stuff','Pariatur cupidatat dolor magna tempor anim exercitation sint officia commodo mollit incididunt aute aute. Non aliqua cillum velit esse irure. Adipisicing nulla laborum id reprehenderit officia anim anim dolor et eiusmod ipsum officia et culpa. Tempor excepteur laboris consectetur commodo aliqua non dolor do. Nostrud laborum nostrud excepteur id aliqua dolor adipisicing ex pariatur exercitation quis magna adipisicing.');
insert into help_requests (owner_id, date ,type,title,description) values (2 ,datetime('now'),'Coding','I need help on java stuff','Qui esse eu et consequat voluptate cupidatat elit ad incididunt occaecat nostrud adipisicing consequat magna. Non ex pariatur laborum voluptate eu nisi voluptate reprehenderit. Do irure veniam sit exercitation elit voluptate laborum cillum quis aliquip.');


insert into help_offers (helper_id , request_id) values (1,2);


insert into messages (sender_id,receiver_id,date,message) values (2,1, datetime('now') , "thank you for sending a help offer do you think you can help me ?");

