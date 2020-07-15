const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Show a "Hello, World" greeting and a name input form
function indexHandler(request, response) {
    response.send(`<!DOCTYPE html>
                   <title>Hello, World!</title>
                   <p>Hello, World!</p>
                   <form action="/greet_user" method="POST">
                   <p>Your name: <input type="text" name="username"></p>
                   <p><input type="submit"></p>
                   </form>`);
}

// Greet the user supplied in request.body
function formHandler(request, response) {
    const username = request.body.username;
    response.send(`<!DOCTYPE html>
                   <title>Hello, ${username}!</title>
                   <p>Hello, ${username}!</p>`);
}

// Handle POSTed form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routes
app.get('/', indexHandler);
app.post('/greet_user', formHandler);

// Start the server
console.log('Running on http://localhost:8080/');
app.listen(8080);