const redis = require('redis');

 

// Replace these values with your Redis server configuration

const redisHost = '127.0.0.1'; // e.g., '127.0.0.1' for localhost

const redisPort = 6380; // Default Redis port

 

// Create a Redis client

const client = redis.createClient({

  host: redisHost,

  port: redisPort,

  // You can add more configuration options here if needed

});

 

// Connect to the Redis server

client.on('connect', () => {

  console.log('Connected to Redis');

});

 

// Handle errors

client.on('error', (err) => {

  console.error('Redis Error:', err);

});

 

// Example: Set a key-value pair in Redis

client.set('myKey', 'myValue', (err, reply) => {

  if (err) {

    console.error('Error setting key:', err);

  } else {

    console.log('Set key:', reply);

  }

 

  // Close the Redis connection when done

  client.quit();

});