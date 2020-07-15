const express = require('express');
var escapeHtml = require('escape-html');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

let text = 'Once upon a time...';

app.get('/', (req, res) => {
    // Generate a form
    res.send(
        `<!DOCTYPE html><title>Shared Editor</title>
         <h1>Shared Editor</h1>
         <form action="/update" method="POST">
         <p>Old Value:</p>
         <p style="white-space: pre-wrap; background: #eee;">${escapeHtml(text)}</p>
         <p>Enter a New Value:</p>
         <textarea name="text" style="width: 100%;" rows="10">${escapeHtml(text)}</textarea>
         <input type="submit" value="Save Changes">
         </form>`
    );
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/update', (req, res) => {
    // Update the value of the shared editor
    text = String(req.body.text);

    // Redirect back to the root page to show the updated form
    res.redirect('/');
});

app.listen(port, () => console.log(`The shared editor is running on http://localhost:${port}/`));
