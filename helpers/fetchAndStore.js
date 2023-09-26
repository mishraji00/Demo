const axios = require('axios');
const mysql = require('mysql2');
// const schedule = require('node-schedule');


require("dotenv").config();

const connection = mysql.createConnection({
    host     :  "localhost",
    user      : "root",
    password  : "root123",
    database  : "student"
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL');
});

async function fetchDataAndStore() {
    try {
      // Make API request
      const response = await axios.get('https://reqres.in/api/users?page=2');
      const apiData = response.data.data;
  
      // Create a table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY,
          email VARCHAR(255),
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          avatar VARCHAR(255)
        )
      `;
      connection.query(createTableQuery);
  
      // Store data in the MySQL database
      for (const user of apiData) {
        const insertQuery = `
          INSERT INTO users (id, email, first_name, last_name, avatar)
          VALUES (${user.id}, '${user.email}', '${user.first_name}', '${user.last_name}', '${user.avatar}')
        `;
        connection.query(insertQuery);
      }
  
      console.log('Data successfully stored in the database.');
    } catch (error) {
      console.error('Error fetching data from API or storing in the database:', error);
    } 
  }
//   const job = schedule.scheduleJob('0 * * * *', () => {
//     console.log('Fetching data and storing in the database...');
//     fetchDataAndStore();
// });  


