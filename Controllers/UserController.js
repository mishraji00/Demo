const UserModel = require('../models/UserModel');
const {log} =require('../config/loggerFile')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const key =process.env.key;
// const redis = require('redis');
// const redisClient = redis.createClient();

// Function to store JWT in Redis
// function storeJwtInRedis(userId, token) {
//   const key = `jwt:${userId}`;
//   redisClient.set(key, token, 'EX', 3600); // Set the token to expire in 1 hour (adjust as needed)
// }

async function getUsers(req, res) {
  try {
    const data = await UserModel.getAllUsers();
    

    log.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      message: 'Successfully fetched the users',
      requestBody: req.body,
      responseBody: data, // Include the response body in the log
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    log.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while fetching User',
      error: error.message,
      requestBody: req.body,
    });

    res.status(500).json({ error: 'Could not fetch User', details: error.message });
  }
}

async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const data = await UserModel.getUserById(id);

    if (!data || data.length === 0) {
      log.error({
        method: req.method,
        url: req.originalUrl,
        statusCode: 404,
        message: `User with ID ${id} not found`, // Include the actual ID value
        error: 'User not found',
        //sqlQuery:EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query
        requestBody: req.body,
      });

      res.status(404).json({ error: 'User not found' });
    } else {
      log.info({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'Successfully fetched the User',
        requestBody: req.body,
        responseBody: data, // Include the response body in the log
        //sqlQuery: EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query

      });

      res.status(200).json(data);
    }
  } catch (error) {
    log.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while fetching User',
      error: error.message,
      requestBody: req.body,
     // sqlQuery: EmployeeModel.getEmployeeById.sqlQuery, // Include the actual ID value in the SQL query

    });

    res.status(500).json({ error: 'Could not fetch User', details: error.message });
  }
}

async function insertUser(req, res) {
  
  const data = req.body;
  const salt = bcrypt.genSalt(10);
  data.password = bcrypt.hash(data.password,salt);

  try {
    const result = await UserModel.insertUser(data);
    const token = jwt.sign({ id: result.insertId }, key, { expiresIn: '1h' });
    storeJwtInRedis(result.insertId, token);

    log.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      message: 'User registered successfully',
      requestBody: req.body,
     // sqlQuery: EmployeeModel.insertEmployee.sqlQuery,
      responseBody: result // Include the response body in the log
    });

    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    log.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while inserting user',
      error: error.message,
      requestBody: req.body,
      //sqlQuery: EmployeeModel.insertEmployee.sqlQuery ,
    });

    res.status(500).json({ error: 'Could not insert employee', details: error.message });
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const isUpdated = await UserModel.updateUser(id, data);

    if (isUpdated) {
      log.info({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'User updated successfully',
        requestBody: req.body,
       // sqlQuery:EmployeeModel.updateEmployee.sqlQuery,
      });

      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    log.error({
      method: req.method,
      url: req.originalUrl,
      statusCode:500,
      message: 'Error while updating User',
      error: error.message,
      requestBody: req.body,
       // sqlQuery: EmployeeModel.updateEmployee.sqlQuery,
    });

    res.status(500).json({ error: 'Could not update User', details: error.message });
  }
}
async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const isDeleted = await UserModel.deleteUser(id);

    if (isDeleted) {
      log.info({
        method: req.method,      
        url: req.originalUrl,
        statusCode: res.statusCode,
        message: 'User deleted successfully',
        requestBody: req.body,
       // sqlQuery: EmployeeModel.deleteEmployee.sqlQuery,
        responseBody: isDeleted, // Include the response body in the log
      });

      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      log.error({
        method: req.method,
        url: req.originalUrl,
        statusCode: 404,
        message: 'User not found',
        error: 'User not found',
        requestBody: req.body,
      });

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    log.error({
      method: req.method,
      url: req.originalUrl,
      statusCode: 500,
      message: 'Error while deleting User',
      error: error.message,
      requestBody: req.body,
      //sqlQuery:EmployeeModel.deleteEmployee.sqlQuery,
    });

    res.status(500).json({ error: 'Could not delete User', details: error.message });
  }
}

 async function login(req, res){
    try {
      const {email,password} = req.body;
  
      const user = await UserModel.getUserByEmail(email);
  
      if (!user) {
        return res.status(400).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
  
      const isPasswordValid = bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        user.password = undefined;
        const jsontoken = jwt.sign({ user }, key, {
          expiresIn: "1hr",
        });
  
        log.info({
          method: req.method,
          url: req.originalUrl,
          statusCode: 200,
          message: "User logged in successfully",
          requestBody: req.body,
          responseBody: user,
        });
  
        return res.status(200).json({
          success: "Login Successful",
          token: jsontoken,
        });
      } else {
        log.error({
          method: req.method,
          url: req.originalUrl,
          statusCode: 400,
          message: "Invalid email or password",
          requestBody: req.body,
          responseBody: user,
        });
  
        return res.status(400).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(error);
  
      log.error({
        method: req.method,
        url: req.originalUrl,
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
        requestBody: req.body,
      });
  
      return res.status(500).json({
        success: 0,
        message: "Internal server error",
      });
    }
  }
  
  

// async function login(req,res){
//     const data = req.body;
//     const email= data.email;
//     try {
        
//         const results = await UserModel.getUserByEmail(email);
  
//         if (!results) {
//           return res.status(400).json({
//             success: 0,
//             message: "Invalid email or password"
//           });
//         }
  
//         const result = compareSync(data.password, results.password);
  
//         if (result) {
//           results.password = undefined;
//           const jsontoken = jwt.sign({ result: results }, key, {
//             expiresIn: "1hr"
//           });
//           log.info({
//             method: req.method,
//             url: req.originalUrl,
//             statusCode: 200,
//             message: 'User logged in successfully',
//             requestBody: req.body,
//             responseBody: results,
//           });
//             return res.status(200).json({
//             success: "Login Successful",
//             token: jsontoken
//           });
//         } else {
//                 log.error({
//                 method: req.method,
//                 url: req.originalUrl,
//                 statusCode: 200,
//                 message: 'Invalid mail or password',
//                 requestBody: req.body,
//                 responseBody: results,
//               });

//           return res.status(400).json({
//             success: 0,
//             message: "Invalid email or password"
//           });
          
//         }
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//           success: 0,
//           message: 'Internal server error'
//         });
//       }
// }

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  login
};






