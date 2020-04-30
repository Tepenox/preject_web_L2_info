drop table if exists conversations;
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
    description TEXT NOT NULL,
    is_admin TEXT DEFAULT 'false'
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
    object_id INTEGER NOT NULL, -- useful te redirect to the object that caused the notification , if we won t need it , the object id will be -1
    FOREIGN KEY (from_id)
       REFERENCES users(id),
    FOREIGN KEY (receiver_id)
        REFERENCES users(id)
);

CREATE TABLE conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_user_id INTEGER NOT NULL,
    second_user_id INTEGER NOT NULL,
    update_date TEXT NOT NULL,
    FOREIGN KEY (first_user_id)
       REFERENCES users(id),
    FOREIGN KEY (second_user_id)
        REFERENCES users(id)
);


insert into users (first_name,last_name,age,email,password,description,is_admin) values('Anass','EL AFYA',22,'anass@gmail.com','12345678','this is description','true');
insert into users (first_name,last_name,age,email,password,description,is_admin) values('Cedric','MASSAT',21,'cedric@gmail.com','12345678','this is description','true');
insert into users (first_name,last_name,age,email,password,description) values('Nicolas','YAVERIAN',20,'nicolas@gmail.com','12345678','this is description');


insert into help_requests (owner_id, date ,type,title,description) values (1 ,datetime('now'),'Coding help','css','Pariatur cupidatat dolor magna tempor anim exercitation sint officia commodo mollit incididunt aute aute. Non aliqua cillum velit esse irure. Adipisicing nulla laborum id reprehenderit officia anim anim dolor et eiusmod ipsum officia et culpa. Tempor excepteur laboris consectetur commodo aliqua non dolor do. Nostrud laborum nostrud excepteur id aliqua dolor adipisicing ex pariatur exercitation quis magna adipisicing.');
insert into help_requests (owner_id, date ,type,title,description) values (2 ,datetime('now'),'Coding help','java','Qui esse eu et consequat voluptate cupidatat elit ad incididunt occaecat nostrud adipisicing consequat magna. Non ex pariatur laborum voluptate eu nisi voluptate reprehenderit. Do irure veniam sit exercitation elit voluptate laborum cillum quis aliquip.');
insert into help_requests (owner_id, date ,type,title,description) values (1 ,datetime('now'),'Building/repairing help','I need help on some gardening','Qui esse eu et consequat voluptate cupidatat elit ad incididunt occaecat nostrud adipisicing consequat magna. Non ex pariatur laborum voluptate eu nisi voluptate reprehenderit. Do irure veniam sit exercitation elit voluptate laborum cillum quis aliquip.');
