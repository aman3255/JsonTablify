const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnect } = require('./src/database/connect');
const v1Router = require('./src/routers/v1/v1.router');

const app = express();
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.DEV_PORT;

app.use('/api/v1', v1Router);

async function startServer() {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} - ${NODE_ENV} environment`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}
startServer();