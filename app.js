const express = require('express');
const app = express();
const port = 3000
const redis = require('redis');
const bodyParser = require('body-parser');
var client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.get('vcounter', function() {
    client.incr('vcounter', function(err, reply) {
    console.log(reply); 
    app.get('/', (req, res) => {
        res.send("This is the " + reply + " visitor"); 
    });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

