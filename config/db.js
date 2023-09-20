const mysql = require('mysql2/promise');


require('dotenv').config()

//const password = crypto.encrypt(process.env.MYSQL_PASSWORD);
//return password;

const db = mysql.createPool({
        host      : process.env.MYSQL_HOST,
        user      : process.env.MYSQL_USER,
        password  : process.env.MYSQL_PASSWORD,
        database  : process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        dateStrings: true
        //timezone : "utc+5:30"

    }
 );

module.exports = db;

