CREATE TABLE todos (
  id int not null auto_increment,
  content varchar(250) not null,
  archived bit(1) not null DEFAULT b'0',
  created timestamp,
  primary key (id)
);

insert into todos (content, created) values ('Go to interview at inventi!', '2019-01-28');