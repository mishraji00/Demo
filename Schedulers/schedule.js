const schedule = require('node-schedule');
const { fetchDataAndStore } = require('../models/SchedulerModel');
const axios = require('axios');

function scheduleDataInsertion() {
    // Schedule data insertion in the MySQL database
    console.log('Data insertion scheduled to run every 10 seconds.');

    const job = schedule.scheduleJob('*/10 * * * * *', async () => {
        try {
            // Make API request
            const response = await axios.get('https://reqres.in/api/users?delay=3');
            const apiData = response.data.data;
            
            // Call the fetchDataAndStore function to process and store the data
            await fetchDataAndStore(apiData);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}
scheduleDataInsertion();
