\echo
\echo ------------------------
\echo Querying the database
\echo ------------------------
\set ECHO queries

-----------------------------------------
\echo
\echo What are all the items in the shopping list, in order?
\echo

  select *
    from shopping_item
order by shopping_item.description;

-----------------------------------------
\echo
\echo Which items start with 'C'?
\echo

select *
  from shopping_item
 where shopping_item.description like 'C%';

-----------------------------------------
\echo
\echo What items have a total quantity greater than six?
\echo

  select shopping_item.description, sum(shopping_item.quantity)
    from shopping_item
group by shopping_item.description
  having sum(shopping_item.quantity) > 6;
