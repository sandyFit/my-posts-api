const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const { db } = require('./config/db.config');

const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.routes');

app.use(bodyParser.json());

app.use('/users', usersRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
