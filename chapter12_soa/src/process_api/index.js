const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const processes = require('./processes.js');

// The path to the built React project
const buildPath = path.join(__dirname, '../../dist/');

// Redirect top-level requests to the single-page web application
app.get('/', (req, res) => {
    if (fs.existsSync(path.join(buildPath, 'index.html')))
        res.redirect('/index.html');
    else
        res.send('The server is running. Build the React frontend using "npm run build" or "npm run watch" and refresh this page.');
});

// Serve the single-page web application
app.use('/', express.static(path.join(__dirname, '../../dist/')));

// Serve the application's JSON-based domain logic web API under /api
app.use(bodyParser.json());
app.use('/api', processes.route);

// Start the server immediately
app.listen(port, () => {
    console.log(`The shopping list API / business process layer is running on http://localhost:${port}/`);
    console.log(`Please ensure the notification service and shopping list services are also running`);
});
