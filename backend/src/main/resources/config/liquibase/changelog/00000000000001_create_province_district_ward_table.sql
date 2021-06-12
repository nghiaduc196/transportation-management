--liquibase formatted sql
--changeset nghianc:create_province_district_ward_table

create table district (code varchar(255) not null, created_by varchar(50) not null, created_date datetime(6), last_modified_by varchar(50), last_modified_date datetime(6), name varchar(255), province_code varchar(255), primary key (code)) engine=InnoDB;
create table province (code varchar(255) not null, name varchar(255), primary key (code)) engine=InnoDB;
create table ward (code varchar(255) not null, name varchar(255), district_code varchar(255), primary key (code)) engine=InnoDB;
alter table district add constraint FK79l51ggj1wv1opcs6dkcy8c98 foreign key (province_code) references province (code);
alter table ward add constraint FK3x802nplawd033ox9fsntk06u foreign key (district_code) references district (code);
