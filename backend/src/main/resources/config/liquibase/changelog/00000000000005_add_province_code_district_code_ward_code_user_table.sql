--liquibase formatted sql
--changeset nghianc:add_province_code_district_code_ward_code_user_table

alter table jhi_user add column fcm_token varchar(255);
alter table jhi_user add column phone_number varchar(50);
alter table jhi_user add column district_code varchar(255);
alter table jhi_user add column province_code varchar(255);
alter table jhi_user add column ward_code varchar(255);
alter table jhi_user add constraint FKq7jh0n87ee85uxuvwh16uphyf foreign key (province_code) references province (code);
alter table jhi_user add constraint FK4t7inu6fjfbujqah0iyy1ky6l foreign key (district_code) references district (code);
alter table jhi_user add constraint FK51r3ykw1y2tp7tgp3s9dsc7kr foreign key (ward_code) references ward (code);

