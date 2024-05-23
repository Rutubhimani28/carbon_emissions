
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/config.js';
import('dotenv/config')

const port = 8080

//Setup Express App
const app = express();
// Middleware
app.use(bodyParser.json());
// Set up CORS  
app.use(cors())
//API Routes
// app.use('/api', route);


app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});


const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});


// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
const DATABASE = process.env.DB || 'Carbon'

db(DATABASE_URL, DATABASE);