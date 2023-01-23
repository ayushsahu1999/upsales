const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'upsales',
    password: 'Ayush@123'
});

module.exports = pool.promise();