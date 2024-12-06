const mysql = require ('mysql2');

const pool = mysql.createpool({
    host: 'localhost',
    user: 'root',
    password: 'Launchpadphilly801',
    database: 'fintech'
});

const query = mysql.connection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_password || 'Launchpad801',
    database: process.env.DB_NAME || 'fintech'

})
