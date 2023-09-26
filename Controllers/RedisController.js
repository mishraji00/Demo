const {redisClient} = require('../config/redis');
const {log} = require("../config/loggerFile")


async function storeJwtInRedis(email,token) {
  try{
    const key = `jwt:${email}`;
    const response = await redisClient.set(key,token,'EX',3600);
  if (response) {
    log.info("Token stored in Redis");
    return true; 
  } else {
    log.error("Failed to store token in Redis");
    return false;
  }

  }
  catch(error){
    console.log(error);
      log.error('internal server error');

  }
}


async function getStoredTokenFromRedis(email) {
    try {
      const key = `jwt:${email}`; // Use email as part of the key
      const response = await redisClient.get(key);
      if (response) {
        log.info("Token Retrieved from Redis");
        return response; // Return the retrieved token
      } else {
        log.error("Failed to Retrieve token from Redis");
        return null; // Return null if token is not found
      }
    } catch (error) {
      console.log(error);
      log.error('Internal server error');
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  }



// async function getStoredTokenFromRedis(email) {
//     try{
//     const key = process.env.key;
//     const response = await redisClient.get(key);
//     if (response) {
//       log.info("Token Retrieved from Redis");
//       return true; 
//     } else {
//       log.error("Failed to Retieve token from Redis");
//       return false;
//     }
  
//     }
//     catch(error){
//       console.log(error);
//       log.error('internal server error');
     
//     }
//   }



module.exports = {storeJwtInRedis,getStoredTokenFromRedis};
