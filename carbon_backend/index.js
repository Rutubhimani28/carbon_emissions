// const express = require('express');
// const db = require('./db/connectDB')
// const serverRoute = require('./routes/serverRoutes');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const port = 8000
// require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/connectDB.js';
import serverRoute from './routes/serverRoutes.js';
import https from 'https';
import fs from 'fs';
import 'dotenv/config';

// const port = 8000
const port = 443

//Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

//API Routes
app.use('/api', serverRoute);
app.use("/file", express.static('uploads/'));
app.use("/logo", express.static('middelwares/email_templates/'));

app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});


// Creating object of key and certificate  // for SSL
const options = {
    key: fs.readFileSync("./openSSL/server.key"),
    cert: fs.readFileSync("./openSSL/server.cert"),
};

const server = https.createServer(options, app)
    .listen(process.env.PORT || port, function (req, res) {
        const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
        const { address, port } = server.address();
        const host = address === '::' ? '127.0.0.1' : address;
        console.log(`------- Server listening at ${protocol}://${host}:${port}/`);
    });

// http
// const server = app.listen(process.env.PORT || port, () => {
//     const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
//     const { address, port } = server.address();
//     const host = address === '::' ? '127.0.0.1' : address;
//     console.log(`------- Server listening at ${protocol}://${host}:${port}/`);
// });

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
const DATABASE = process.env.DB || 'Carbon'

db(DATABASE_URL, DATABASE);