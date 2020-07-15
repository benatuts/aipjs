const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Use the session middleware
app.use(session({
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        secure: 'auto'
    },
    resave: false,
    saveUninitialized: false,
    secret: '...change this to a unique secret key...'
}));

// Access the session as req.session
app.get('/', (req, res)  => {
    if (req.session.view_counter)
        req.session.view_counter++
    else
        req.session.view_counter = 1;

    res.send(`<!DOCTYPE html><title>Counter</title>
              <p>You have visited ${req.session.view_counter} times.</p>`);
});

app.get('/login', (req, res)  => {
    // Regenerate the session for security
    req.session.regenerate((err) => {
        if (err) {
            res.send("Could not create session");
        } else {
            // Note: the view_counter will be reset unless it is also resaved here
            req.session.loggedIn = true;
            res.send("You have logged in");
        }
    });
});

app.listen(port, () => console.log(`The login server is running on http://localhost:${port}/`));
