
require('dotenv').config();
const {log} =require('../config/loggerFile')

const db = require('../config/db');

let currentIndex = 0; // Flag to track if records have been fetched

async function fetchDataAndStore(apiData) {
    try {
        // Open a new database connection
        const connection = await db.getConnection();

        if (currentIndex < apiData.length) {
            const user = apiData[currentIndex];
            const recordId = user.id;

            try {
                const insertQuery = `
                    INSERT INTO users (id, email, first_name, last_name, avatar)
                    VALUES (?, ?, ?, ?, ?)
                `;

                // Execute the insert query using the active connection
                await connection.execute(insertQuery, [recordId, user.email, user.first_name, user.last_name, user.avatar]);
                console.log(`Record for id ${recordId} inserted into the database.`);
                log.info(`Record for id ${recordId} inserted into the database.`)
                currentIndex++;

                
            }
            
            catch (error) {
                console.error(`Error inserting record for id ${recordId} into the database:`, error);
                log.error(`Error inserting record for id ${recordId} into the database:`)
            }
        }
       
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { fetchDataAndStore };
