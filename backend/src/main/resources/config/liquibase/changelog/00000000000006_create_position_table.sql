--liquibase formatted sql
--changeset nghianc:create_position_table

create table position (id bigint not null auto_increment, created_by varchar(50) not null, created_date datetime(6), last_modified_by varchar(50), last_modified_date datetime(6), name varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
alter table jhi_user add column position_id bigint;
alter table jhi_user add constraint FKpsmnv2m87xjbd3yashwgxmcu2 foreign key (position_id) references position (id);


