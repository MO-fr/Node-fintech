
import mysql from 'mysql2/promise';

// Create a connection pool for managing multiple database connections
const pool = mysql.createPool({ // Come back to this if the configuration changes
    host: process.env.DB_HOST || 'localhost',         // Database host, defaults to localhost if not set in environment
    user: process.env.DB_USER || 'root',              // Database username, defaults to 'root'
    password: process.env.DB_PASSWORD || 'Launchpad801', // Database password, defaults to 'Launchpad801'
    database: process.env.DB_NAME || 'fintech'        // Database name, defaults to 'fintech'
});

try{
    const [result, field] = await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,        
            username VARCHAR(50) NOT NULL,          
            email VARCHAR(100) NOT NULL UNIQUE,       
            password VARCHAR(255) NOT NULL,           
            full_name VARCHAR(100),                 
            role ENUM('user', 'admin') DEFAULT 'user',
            status ENUM('active', 'inactive') DEFAULT 'active', 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
    );
    
    const [results, fields] = await pool.query(
        `CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,                
        user_id INT NOT NULL,                           
        amount DECIMAL(10, 2) NOT NULL,                  
        type ENUM('credit', 'debit') NOT NULL,          
        description TEXT,                                
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending', 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
        FOREIGN KEY (user_id) REFERENCES users(id)        
        )`
    );

    
    // Log the results of the query
    console.log(results); // Contains information about the executed query
    console.log(fields);  // Contains meta-data about the fields (optional)



    // Log the results of the query
    console.log(result); // Contains information about the executed query
    console.log(field);  // Contains meta-data about the fields (optional)

} catch (err) {
    // Log any errors that occur during the query execution
    console.log(err);
}

export default pool





