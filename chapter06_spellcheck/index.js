const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// A regular expression to match:
// any character not in the set A-Z, a-z or single quote (')
// repeated at least once
//
// i.e., matches anything that isn't a word
const matchNonAlphaQuotes = /[^A-Za-z']+/;

// Same as matchNonAlphaQuotes, but embedded in a group for inclusion in string splitting
const groupNonAlphaQuotes = /([^A-Za-z']+)/;

// Configure Express to handle POSTed HTML form submissions
app.use(bodyParser.urlencoded({ extended: false }))

// Return a form for user input
app.get('/', (req, res) => {
    res.send(
        `<!DOCTYPE html>
         <title>Spell check</title>
         <h1>Spell check</h1>
         <p>Please enter American-English text into the text area:</p>
         <form action="/spell_check" method="POST">
            <p><textarea style="width: 100%;" name="text"></textarea></p>
            <p><input type="submit" value="Spell check"></p>
         </form>`);
});

// Generate a page of spell-checked user input
// Errors are highlighted in yellow
app.post('/spell_check', (req, res) => {
    // Get the user input
    const text = req.body.text;

    // Generate the headers
    let result = 
        `<!DOCTYPE html>
        <title>Spell check</title>
        <h1>Spell check</h1>
        <p>Spelling errors are highlighted in yellow:</p>`;


    // Load the dictionary from wordlist.txt
    const wordlistFile = path.join(__dirname, 'wordlist.txt');
    const wordlistString = fs.readFileSync(wordlistFile, { encoding: 'utf-8' });
    // Create a set from each line of the dictionary
    const wordlist = new Set(wordlistString.split('\n'));

    // Split the user input string into words and non-words
    let words = text.split(groupNonAlphaQuotes);

    // Generate the spelling results
    result += '<p>'; // Open element
    for (let word of words) {
        
        if (word.match(matchNonAlphaQuotes)) {
            // Non-words and whitespace are output unmodified
            result += word;

        } else if (wordlist.has(word)) {
            // Words in the dictionary are output unmodified
            result += word;

        } else if (wordlist.has(word.toLowerCase())) {
            // Words that are found in the dictionary, after lowercasing, are output unmodified
            result += word;
        
        } else {
            // Otherwise, there must be a spelling error
            result += `<span style="background: #ffff00;">${word}</span>`

        }
    }
    result += '</p>'; // Close element

    // Return the spell-checked user input
    res.send(result);
});

app.listen(port, () => console.log(`The spelling check is running on http://localhost:${port}/`));
