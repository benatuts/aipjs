\echo
\echo ------------------------
\echo Inserting sample data
\echo ------------------------
\set ECHO all

insert into shopping_item 
    (description, quantity)
values 
    ('Chocolate bar', 5), 
    ('Pasta', 1),
    ('Banana', 5),
    ('Banana', 3),
    ('Cheese slices', 10),
    ('Carrot', 8),
    ('Carrot', 1);

