const express = require('express');
const app = express();

// ------------------------------------------------
// Establish connection to PostgreSQL database
// ------------------------------------------------
const { Pool } = require('pg');
const pool = new Pool({
    database: 'postgres'
});

// ------------------------------------------------
// Create schema and initialize with sample data
// ------------------------------------------------
async function initialize() {
    await pool.query(
        `create table if not exists shopping_item(
            id serial primary key,
            description text not null,
            quantity numeric not null
        )`
    );
    await pool.query(`delete from shopping_item`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Chocolate bar', 5)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Pasta', 1)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Banana', 5)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Banana', 3)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Cheese slices', 10)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Carrot', 8)`);
    await pool.query(`insert into shopping_item(description, quantity) values ('Carrot', 1)`);
}

// ------------------------------------------------
// GET /items
// Retrieve a list of all items in the database
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/items', async (req, res) => {
    let results = await pool.query(
        `select description, quantity from shopping_item`
    );
    res.json(results.rows);
});

// ------------------------------------------------
// GET /total?description=<Name>
// Retrieve total of items matching the supplied name
// Match is case sensitive
// Null is returned if description is not found
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/total', async (req, res) => {
    let results = await pool.query({
        text: `select sum(quantity) as total from shopping_item where description = $1`,
        values: [req.query.description]
    });
    res.json({total: results.rows[0].total});
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
initialize().then(() =>
    app.listen(3000, () => console.log('Running on http://localhost:3000/'))
);
