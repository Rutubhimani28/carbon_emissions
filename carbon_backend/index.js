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
app.set('views', 'middelwares/email_templates/');

//API Routes
app.use('/api', serverRoute);
app.use("/file", express.static('uploads/images/'));
// app.use("/file", express.static('uploads/'));
app.use("/videos", express.static('uploads/videos/'));
app.use("/logo", express.static('middelwares/email_templates/'));

app.get('/', async (req, res) => {
    res.send('Welcome to my world...')
});

// app.get('/api/tweet-stats', async (req, res) => {
//     const tweetId = req.query.tweetId;
  
//     // Twitter API endpoint to get tweet metrics
//     const apiUrl = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=public_metrics`;
  
//     try {
//       const response = await axios.get(apiUrl, {
//         headers: {
//             Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAFNYzQEAAAAAjnchyPep4Tmngj9%2FPcV0lBjr1VE%3D14GTOoVdjvgpl8uIIYnOUvz2mpU2tFgLh8XjQzyoEAVikuEDOQ`, // Replace with your Bearer Token
//         },
//       });
  
//       const tweetMetrics = response.data.data.public_metrics;
  
//       // Extract the tweet engagement metrics
//       const stats = {
//         likes: tweetMetrics.like_count,
//         retweets: tweetMetrics.retweet_count,
//         comments: tweetMetrics.reply_count,
//       };
  
//       res.json(stats); // Send metrics as JSON response
//     } catch (error) {
//       console.error('Error fetching tweet metrics:', error);
//       res.status(500).json({ error: 'Failed to fetch tweet stats' });
//     }
//   });

const options = {
    key: fs.readFileSync("./openSSL/server.key"),
    cert: fs.readFileSync("./openSSL/server.cert"),
    // key: fs.readFileSync('./openSSL/generated-private-key.txt'),
    // cert: fs.readFileSync('./openSSL/generated-csr.txt'),
};

if ((process.env.HTTPS === true || process.env.NODE_ENV === 'production')) {
    const server = https.createServer(options, app)
        .listen(process.env.PORT || port, function (req, res) {
            const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
            const { address, port } = server.address();
            const host = address === '::' ? '127.0.0.1' : address;
            console.log(`------- if Server listening at ${protocol}://${host}:${port}/`);
        });
} else {
    const server = app.listen(process.env.PORT || port, () => {
        const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
        const { address, port } = server.address();
        const host = address === '::' ? '127.0.0.1' : address;
        console.log(`------- else Server listening at ${protocol}://${host}:${port}/`);
    });
}

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
