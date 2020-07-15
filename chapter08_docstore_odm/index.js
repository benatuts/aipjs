const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Document mapping
// i.e., declare the schema of collections in the db
// ------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shoppingDB', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const ShoppingItem = mongoose.model('item', {
    description: {type: String, index: true},  // Use an index on description for faster querying
    quantity: Number
});

// ------------------------------------------------
// Create sample data
// ------------------------------------------------
async function initialize() {
    await ShoppingItem.deleteMany({}); // Remove all existing items

    await new ShoppingItem({description: 'Chocolate bar', quantity: 5}).save();
    await new ShoppingItem({description: 'Pasta', quantity: 1}).save();
    await new ShoppingItem({description: 'Banana', quantity: 5}).save();
    await new ShoppingItem({description: 'Banana', quantity: 3}).save();
    await new ShoppingItem({description: 'Cheese slices', quantity: 10}).save();
    await new ShoppingItem({description: 'Carrot', quantity: 8}).save();
    await new ShoppingItem({description: 'Carrot', quantity: 1}).save();
}

// ------------------------------------------------
// GET /items
// Retrieve a list of all items in the database
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/items', async (req, res) => {
    let results = await ShoppingItem.find();
    res.json(results);
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
    let result = await ShoppingItem.aggregate(
        [
            { $match: { description: { $eq: req.query.description }} },
            { $group: { _id: null, total: {$sum: '$quantity'}} }
        ]
    );
    if (result.length == 0)
        res.json({ total: 0 });
    else
        res.json({ total: result[0].total });
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
initialize().then(() =>
    app.listen(3000, () => console.log('Running on http://localhost:3000/'))
);