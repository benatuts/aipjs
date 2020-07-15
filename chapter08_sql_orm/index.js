const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Relational Mapping
// ------------------------------------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'postgres',  // Database name
    null,        // Username
    null,        // Password
    {dialect: 'postgres', host: 'localhost'}
);

const ShoppingItem = sequelize.define('shopping_item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: Sequelize.TEXT,
    quantity: Sequelize.NUMERIC
});

// ------------------------------------------------
// Initialize database and create sample data
// ------------------------------------------------
async function initialize() {
    // Create the database tables (force them to be created from scratch)
    await sequelize.sync({force: true});

    // Add sample data
    await ShoppingItem.create({description: 'Chocolate bar', quantity: 5});
    await ShoppingItem.create({description: 'Pasta', quantity: 1});
    await ShoppingItem.create({description: 'Banana', quantity: 5});
    await ShoppingItem.create({description: 'Banana', quantity: 3});
    await ShoppingItem.create({description: 'Cheese slices', quantity: 10});
    await ShoppingItem.create({description: 'Carrot', quantity: 8});
    await ShoppingItem.create({description: 'Carrot', quantity: 1});
}

// ------------------------------------------------
// GET /items
// Retrieve a list of all items in the database
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/items', async (req, res) => {
    let results = await ShoppingItem.findAll();
    return res.json(results);
});

// ------------------------------------------------
// GET /total?description=<Name>
// Retrieve total of items matching the supplied name
// Match is case sensitive
// 0 is returned if description is not found
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/total', async (req, res) => {
    let results = await ShoppingItem.sum(
        'quantity',
        { where: {description: req.query.description} }
    );
    res.json({total: results});
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
initialize().then(() =>
    app.listen(3000, () => console.log('Running on http://localhost:3000/'))
);

