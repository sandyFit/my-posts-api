const { createPool } = require('mysql');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config({ path: './config/.env' });

// Use environment variables with process.env
const db = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

// Function to test database connection
const testDbConnection = () => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Database connection failed:', err);
        } else {
            console.log('Database connected successfully:', results);
        }
    });
};

// Test the connection when the server starts
testDbConnection();

module.exports = db;