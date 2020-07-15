const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

// The list of servers in the cluster
let servers = [
    'localhost:3001',
    'localhost:3002',
    'localhost:3003'
];

// Helper to perform GET /processVideos on a server in the cluster
async function processRemoteVideos(server) {
    let result = await fetch(`http://${server}/processVideos`);
    let json = await result.json();
    return json.duration;
}

// Compute the total duration of videos in the cluster 
app.get('/total', async (req, res) => {

    // Start all requests simultaneously
    // and wait until they all resolve
    let result = await Promise.all(
        servers.map(server => processRemoteVideos(server))
    );

    // Aggregate each of the individual results into a total
    let total = result.reduce((acc, curr) => acc + curr, 0);

    // Return the total
    res.json({ total });

});

app.listen(port, () => console.log(`The API server is running on http://localhost:${port}/total`));
