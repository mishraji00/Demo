const {verify} = require("jsonwebtoken");
require('dotenv').config();
const {getStoredTokenFromRedis} =require('../Controllers/RedisController')
const key = process.env.key;

async function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = verify(token, key); // Verify the token using your JWT secret key
      req.user = decoded;

      if (decoded && decoded.user.email){
  
      const email = decoded.user.email; // Extract email from the JWT payload
  
      const storedToken = await getStoredTokenFromRedis(email);
  
      if (storedToken === token) {
        // Token matches the one stored in Redis; user is authenticated
        next();
      } 
    }else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error while verifying token:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  module.exports = {authenticateToken};
  



// async function authenticateToken(req, res, next) {
//     const token = req.header('Authorization');
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//       const decoded = verify(token,key);
//       req.user = decoded;
  
//       const storedToken = await getStoredTokenFromRedis(decoded.email);
  
//       if (storedToken === token) {
//         // Token matches the one stored in Redis; user is authenticated
//         next();
//       } else {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//     } catch (error) {
//       console.error('Error while verifying token:', error);
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   }
 
//   module.exports = {authenticateToken};

















// const key= process.env.key;

// module.exports = {
//     checkToken: (req,res,next) => {
//         let token= req.get("authorization");
//         if(token){
//           token.slice(7);
//           verify(token,key, async(err,decoded) => {
//              if(err){
//                 res.json({
//                     success:0,
//                     message: "Invalid Token"
//                 });
//              }
//             //  jwt.verify(token, key, async (err, decoded) => {
//             //     if (err) {
//             //       return res.status(401).json({ success: 0, message: 'Invalid token' });
//             //     }
            
//             //     // Check if the token exists in Redis (optional but recommended)
//             //     const storedToken = await getLoginDetails(decoded.email);
//             //     if (token !== storedToken) {
//             //       return res.status(401).json({ success: 0, message: 'Token is no longer valid' });
//             //     }
            
//             //     // Attach the user data from the token to the request for further use
//             //     req.user = decoded;
//             //     next();
//             //   });
//             // }


//              else{
//                 next();
//              }
//           })
//         }
//         else{
//             res.json({
//                 success:0,
//                 message: "Access Denied!!"
        
//             })
//         }
//     }
// }