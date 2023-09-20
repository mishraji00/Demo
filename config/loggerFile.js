const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require("config");


const log = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: config.get("logConfig.logFolder") + config.get("logConfig.logFile"),
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Specify your desired date-time format
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, method, url, statusCode, error, requestBody, responseBody }) => {
            let logMessage = `${timestamp} [${level}] `;
            if(method){
              logMessage += `, Method: [${method}]`;
            }
  
            if(url){
              logMessage += `, URL: ${url}`;
            }
            
            if (error) {
              logMessage += `, Error: ${error}`;
            }
            if(statusCode){
              logMessage += `, Status Code: ${statusCode}`;
            }
            
            if (requestBody) {
              logMessage += `, Request Body: ${JSON.stringify(requestBody)}`;
            }
            
            if (responseBody) {
              logMessage += `, Response Body: ${JSON.stringify(responseBody)}`;
            }
  
            if(message){
              logMessage += `, Message: ${message}`;
  
            }
  
          
            return logMessage;
        })
      ),
    }),
  ],
});

module.exports = { log };



// const crudLogger = createLogger({
//   transports: [
//     new transports.File({
//       filename: 'request.log',
//       level: 'info',
//       format: format.combine(
//         format.timestamp(),
//         format.json(),
//         format.printf(({ timestamp, level, message, method, url, statusCode, error, requestBody, responseBody }) => {
//           let logMessage = `${timestamp} [${level}] [${method}] - ${url}, Status: ${statusCode}, Message: ${message}`;
          
//           if (error) {
//             logMessage += `, Error: ${error}`;
//           }
          
//           if (requestBody) {
//             logMessage += `, Request Body: ${JSON.stringify(requestBody)}`;
//           }
          
//           if (responseBody) {
//             logMessage += `, Response Body: ${JSON.stringify(responseBody)}`;
//           }

        
//           return logMessage;
//         })
//       ),
//     }),
//   ],
// });

// module.exports = { crudLogger };





