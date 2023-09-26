const axios = require('axios');
const schedule = require('node-schedule');
require('dotenv').config();

const db = require('./config/db');

let currentIndex = 0;

async function fetchDataAndStore() {
    try {
        // Make API request
        const response = await axios.get('https://reqres.in/api/users?delay=3');
        const apiData = response.data.data;

        // Schedule data insertion in the MySQL database
        const job = schedule.scheduleJob('*/10 * * * * *', async () => {
            if (currentIndex < apiData.length) {
                const user = apiData[currentIndex];
                const recordId = user.id;

                try {
                    const insertQuery = `
                        INSERT INTO users (id, email, first_name, last_name, avatar)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    await db.execute(insertQuery, [recordId, user.email, user.first_name, user.last_name, user.avatar]);
                    console.log(`Record for id ${recordId} inserted into the database.`);
                } catch (error) {
                    console.error(`Error inserting record for id ${recordId} into the database:`, error);
                }

                currentIndex++;
            } else {
                // Close the connection after all records have been processed
                await db.end();
                console.log('All records have been fetched.');
                job.cancel();
            }
        });

        console.log('Data insertion scheduled to run every 10 seconds.');
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndStore();
