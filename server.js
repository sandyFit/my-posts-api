const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config({ path: './config/.env' });

// Import routes
const usersRoutes = require('./routes/users.routes');

// Database connection (assuming it's in `db.config.js`)
const { db } = require('./config/db.config');

app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // You can use the latest OpenAPI version
    info: {
        title: 'my-posts API',
        version: '1.0.0',
        description: 'API documentation for my-posts',
        contact: {
            name: 'Developer',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    }
  },
  apis: ['./routes/*.js'], // Points to where your Swagger documentation is defined
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use the users routes
app.use('/users', usersRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
