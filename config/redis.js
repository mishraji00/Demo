
var redis = require('redis');
require('dotenv').config();

 

let redisClient;

 

(async () => {

  redisClient = redis.createClient({ url: `redis://${process.env.redis_host}:${process.env.redis_port}` });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

})();

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Listen for the 'error' event to handle any connection errors
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Listen for the 'end' event to handle when the connection is closed
redisClient.on('end', () => {
  console.log('Redis connection closed');
});


 

module.exports = {

    redisClient

}