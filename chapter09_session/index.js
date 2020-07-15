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

app.listen(port, () => console.log(`The counter is running on http://localhost:${port}/`));
