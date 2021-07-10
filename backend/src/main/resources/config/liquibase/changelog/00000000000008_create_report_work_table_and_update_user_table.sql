--liquibase formatted sql
--changeset nghianc:create_report_work_table_and_update_user_table.sql

create table report_work (id bigint not null auto_increment, created_by varchar(50) not null, created_date datetime(6), last_modified_by varchar(50), last_modified_date datetime(6), address_end varchar(255), address_start varchar(255), description longtext, images longtext, license_plate varchar(255), name_customer varchar(255), phone_customer varchar(255), total_money decimal(19,2), user_id bigint, primary key (id)) engine=InnoDB;
create table report_workers_detail (id bigint not null auto_increment, created_by varchar(50) not null, created_date datetime(6), last_modified_by varchar(50), last_modified_date datetime(6), report_id bigint, user_id bigint, primary key (id)) engine=InnoDB;
alter table report_work add constraint FKmg2y1d4qdd41hwws6s3h8kh73 foreign key (user_id) references jhi_user (id);
alter table report_workers_detail add constraint FKq05bcb519ow0e787svlpfdd1k foreign key (report_id) references report_work (id);
alter table report_workers_detail add constraint FKtnedemj38utukkdr1yij9g765 foreign key (user_id) references jhi_user (id);
alter table report_work add column implementation_date datetime(6);


