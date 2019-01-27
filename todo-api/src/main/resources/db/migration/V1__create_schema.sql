CREATE TABLE todos (
  id int not null auto_increment,
  content varchar(250) not null,
  archived bit(1) not null DEFAULT b'0',
  created timestamp DEFAULT NOW(),
  completed timestamp,
  primary key (id)
);

insert into todos (content) values ('Go to interview at inventi!');