\echo
\echo ------------------------
\echo Creating database schema
\echo ------------------------
\set ECHO queries

create table shopping_item(
    id serial primary key,
    description text not null,
    quantity numeric not null
);
