--liquibase formatted sql
--changeset nghianc:add_column_deleted_user_table

alter table jhi_user add column deleted bit not null;


