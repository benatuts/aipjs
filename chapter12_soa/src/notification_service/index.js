const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

app.use(bodyParser.json());

// Notify all team members that a new item has been added to the shopping list
app.post('/notify/create', (req, res) => {
    let description = req.body.description;

    console.log(`---------------------------------------------`);
    console.log(`To: Everyone`);
    console.log(`From: shopping list app`);
    console.log(`Please buy this item: ${description}`);

    res.json({success: true});
});

// Notify all team members that an item has been deleted from the shopping list
app.post('/notify/delete', (req, res) => {
    let description = req.body.description;

    console.log(`---------------------------------------------`);
    console.log(`To: Everyone`);
    console.log(`From: shopping list app`);
    console.log(`Warning! Please don't buy this item: ${description}`);

    res.json({success: true});
});

// Start the server immediately
app.listen(port, () => console.log(`The notification service is running on http://localhost:${port}/`));
