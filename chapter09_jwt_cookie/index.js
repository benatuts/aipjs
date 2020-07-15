const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Automatically read the Cookie headers and store in req.cookies
app.use(cookieParser());

const secret = '...change this to a unique secret key...';

// This is a simulated login page
// In production, it should be a POST rather than a GET request
app.get('/login', (req, res)  => {
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

    // Store the JWT in a HTTP-only same-site cookie
    res.cookie('jwt', token, { 
        httpOnly: true, 
        sameSite: 'strict', 
        secure: true
    });

    // Send the response body
    res.send('You have logged in');
});

// This is a demonstration of the verification logic
app.get('/check_login', (req, res) => {
    try {
        if (req.cookies.jwt) {
            // Check that the supplied JWT is:
            // 1. In the correct format
            // 2. Correctly signed with 'secret'
            // 3. Not expired
            let payload = jwt.verify(
                req.cookies.jwt,
                secret
            );
            res.send(`You have logged in as ${payload.username}`);

        } else {
            res.send('You are not logged in');
        }
    } catch (e) {
        res.send('Your JWT is invalid or expired. Log in again.');
    }
});

app.listen(port, () => console.log(`The counter is running on http://localhost:${port}/`));
