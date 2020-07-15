const express = require('express');
const delay = require('delay');
const app = express();
const id = 3;
const port = 3000 + id;

app.get('/processVideos', async (req, res) => {
    // Wait a random time
    await delay(2000 * Math.random());

    // Return a random duration
    res.json({
        duration: 100000 * Math.random()
    });
});

app.listen(port, () => `Worker ${id} is running on http://localhost:${port}/processVideos`);