const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// ------------------------------------------------
// Connect to MongoDB
// ------------------------------------------------

// connect() MUST be fulfilled prior to using db
let db = null;

async function connect() {
    let client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db = client.db('shoppingDB');
}

// ------------------------------------------------
// Create sample data
// ------------------------------------------------
async function initialize() {
    await db.collection('items').insertOne({}); // Create one to ensure that .drop() won't fail
    await db.collection('items').drop(); // Remove existing people
    await db.collection('items').createIndex('description');

    await db.collection('items').insertOne({description: 'Chocolate bar', quantity: 5});
    await db.collection('items').insertOne({description: 'Pasta', quantity: 1});
    await db.collection('items').insertOne({description: 'Banana', quantity: 5});
    await db.collection('items').insertOne({description: 'Banana', quantity: 3});
    await db.collection('items').insertOne({description: 'Cheese slices', quantity: 10});
    await db.collection('items').insertOne({description: 'Carrot', quantity: 8});
    await db.collection('items').insertOne({description: 'Carrot', quantity: 1});
}

// ------------------------------------------------
// GET /items
// Retrieve a list of all items in the database
//
// WARNING: this code does not handle database errors
// ------------------------------------------------
app.use('/items', async (req, res) => {
    let results = await db.collection('items').find().toArray();
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
    let result = await db.collection('items').aggregate(
        [
            { $match: { description: { $eq: req.query.description }} },
            { $group: { _id: null, total: {$sum: '$quantity'}} }
        ]
    ).toArray();
    console.log(result);
    if (result.length == 0)
        res.json({ total: 0 });
    else
        res.json({ total: result[0].total });
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
connect()
.then(() => initialize())
.then(() =>
    app.listen(3000, () => console.log('Running on http://localhost:3000/'))
);
