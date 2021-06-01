const fetch = require('node-fetch');
const express = require('express'); // uses express to run on the server
const app = express();
app.listen(3000, () => console.log('listening on port 3000')); // Start the server and listen on port 3000
app.use(express.static('public')); // Make the folder 'public' accessible to the clients
