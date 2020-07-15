// Fetch is automatically available in web browsers
// However, node-fetch is needed to use fetch from Node.js
const fetch = require('node-fetch');

fetch('http://www.uts.edu.au')
.then(response => console.log('UTS has status code:', response.status));

fetch('http://www.google.com')
.then(response => console.log('Google has status code:', response.status));