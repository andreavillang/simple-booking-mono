create table appointment(
    id int auto_increment,
    name varchar(255) NOT NULL,
    comments varchar(255) NOT NULL,
    schedule datetime NOT NULL
);

insert into appointment(name, comments, schedule) values('Andrea Ang', 'Mandatory annual physical examination from workplace', '20231120 10:00:00');
insert into appointment(name, comments, schedule) values('Anton Ang', 'Mandatory annual physical examination from workplace', '20231120 11:00:00');
insert into appointment(name, comments, schedule) values('Lucas Santos', 'Mandatory annual physical examination from workplace', '20231121 09:00:00');
insert into appointment(name, comments, schedule) values('Veronica Tiu', 'Mandatory annual physical examination from workplace', '20231121 13:00:00');
insert into appointment(name, comments, schedule) values('Elisa Uy', 'Mandatory annual physical examination from workplace', '20231121 16:00:00');
insert into appointment(name, comments, schedule) values('Genesis Gaspar', 'Mandatory annual physical examination from workplace', '20231122 09:00:00');
insert into appointment(name, comments, schedule) values('Mico Aquino', 'Mandatory annual physical examination from workplace', '20231122 08:00:00');
insert into appointment(name, comments, schedule) values('Jay Kay', 'Mandatory annual physical examination from workplace', '20231123 11:00:00');
insert into appointment(name, comments, schedule) values('Carly Rae Jepsen', 'Mandatory annual physical examination from workplace', '20231124 14:00:00');
