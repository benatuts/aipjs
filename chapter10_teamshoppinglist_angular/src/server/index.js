const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const domain = require('./domain.js');

// The path to the built Angular project
const buildPath = path.join(__dirname, '../../dist/');

// Redirect top-level requests to the single-page web application
app.get('/', (req, res) => {
    if (fs.existsSync(path.join(buildPath, 'index.html')))
        res.redirect('/index.html');
    else
        res.send('The server is running. Start the frontend development server and proxy on port 4200 with "npm run start", or run "npm run build" and refresh this page.');
});

// Serve the single-page web application
app.use('/', express.static(buildPath));

// Serve the application's JSON-based domain logic web API under /api
app.use(bodyParser.json());
app.use('/api', domain.route);

// Start the server immediately
app.listen(port, () => console.log(`The shopping list is running on http://localhost:${port}/`));
