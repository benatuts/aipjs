const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const secret = '...change this to a unique secret key...';

// This is a simulated login endpoint
app.post('/login', (req, res)  => {
    // For this demo, I'm bypassing the password check
    // I assume the "Example" user is successfully logged in
    let payload = { username: "Example" };
    
    // Create a JWT from the payload
    // The JWT is signed with 'secret'
    // it will only be valid for 30 minutes
    let token = jwt.sign(
        payload,
        secret,
        { expiresIn: '30 minutes' }
    );

    // Send the response body
    res.json({
        authToken: token
    });
});

// This is a demonstration of the verification logic
// A JWT is assumed to be supplied as a bearer token in an authorization header:
// Authorization: Bearer eyJhbG....Qssw5c
app.get('/check_login', (req, res) => {
    try {
        if (req.headers.authorization) {
            // Extract the JWT from the header
            const bearer = header.split(' ');
            const token = bearer[1];
            // Check that the supplied JWT is:
            // 1. In the correct format
            // 2. Correctly signed with 'secret'
            // 3. Not expired
            let payload = jwt.verify(
                token,
                secret
            );
            res.json({status: true});
        } else {
            res.json({status: false});
        }
    } catch (e) {
        res.json({status: false});
    }
});

app.listen(port, () => console.log(`The counter is running on http://localhost:${port}/`));
