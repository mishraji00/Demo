const axios = require('axios');
const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createConnection({
    host    : process.env.MYSQL_HOST,
    user      : process.env.MYSQL_USER,
    password  : process.env.MYSQL_PASSWORD,
    database  : process.env.MYSQL_DATABASE
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
    const response = await axios.get('https://reqres.in/api/users/2');
    const apiData = response.data.data;

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        avatar VARCHAR(255)
      )
    `;
    connection.query(createTableQuery);

    const insertQuery = `
  INSERT INTO users (id, email, first_name, last_name, avatar)
  VALUES (?, ?, ?, ?, ?)
`;

const values = [apiData.id, apiData.email, apiData.first_name, apiData.last_name, apiData.avatar];

connection.query(insertQuery, values, (error, results) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data successfully inserted:', results);
  }
});
  } catch (error) {
    console.error('Error fetching data from API or storing in the database:', error);
  } finally {
    connection.end();
  }
}

fetchDataAndStore();
