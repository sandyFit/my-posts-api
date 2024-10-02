const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const { db } = require('./config/db.config');

// Basic route to test server
app.use('/test', (req, res) => {
    console.log('Request received');
    res.status(200).send('Success');
});

// Route to test database connection via HTTP request
app.get('/db-test', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Database connection failed:', err);
            res.status(500).send('Database connection failed');
        } else {
            console.log('Database connected successfully:', results);
            res.status(200).send('Database connection successful');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
