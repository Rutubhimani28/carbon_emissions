// const express = require('express');
// const db = require('./db/connectDB')
// const serverRoute = require('./routes/serverRoutes');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const port = 8000
// require('dotenv').config()

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db/connectDB.js";
import serverRoute from "./routes/serverRoutes.js";
import https from "https";
import fs from "fs";
import "dotenv/config";
import { TwitterApi } from "twitter-api-v2";
import axios from "axios";

const client = new TwitterApi({
  appKey: "1891461011544383488Prolink1234",
  appSecret: "ASvhIDVmNs3ZAu6aPcWm5hVCLyWVQQSL6Bq6fAADJtT1PktOEy",
  accessToken: "1891457655572738048-8sCrvVZYy5WGoQudfyu9GOJuSRAOiw",
  accessSecret: "yGqfWFtfXMtCE2UnozGfMpEC3bLrA8AVVunhwxeQbD42u",
});
// console.log(client, "client");
// const port = 8000
const port = 443;

//Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "middelwares/email_templates/");

//API Routes
app.use("/api", serverRoute);
app.use("/file", express.static("uploads/images/"));
// app.use("/file", express.static('uploads/'));
app.use("/videos", express.static("uploads/videos/"));
app.use("/logo", express.static("middelwares/email_templates/"));
                          
app.get("/", async (req, res) => {
  res.send("Welcome to my world...");
});
app.get("/api/tweet-impressions", async (req, res) => {
  console.log("hhhhhhhhh");

  try {
    console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllll");
    const tweetId = "1874109553215975921";
    const accountId = "Prolink1234";

    console.log("2222222222222");
    // Make the API request
    try {
      const response = await client.get(`/11/accounts/${accountId}/stats`, {
        entity_ids: tweetId,
        metric_groups: "ENGAGEMENT",
      });
      console.log(response.data, "RESOINSE");
      const stats = response.data;
      const impressions = stats[tweetId]?.impressions || 0;
      res.json({ impressions });
    } catch (error) {
      console.log(error, "errorKKKKKKKKKKKKKKKKKKk");
    }

    console.log("3333333333333");
  } catch (error) {
    console.error("Error fetching tweet impressions:ooooooooooo", error);

    // If available, log the error response data
    if (error.response && error.response.data) {
      console.error("Error details:", error.response.data);
    }

    // Respond only once to avoid "headers sent" error
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to fetch tweet impressions" });
    }
  }
});
let accessToken = null;
let expiresAt = null;
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token:
            "AQXQrs_e9oV6RpWS-M0zZ2PUs3qNbS65im-SncjJBNSBPa6mIglf6kI3_SbTjmep8uxb8BaZ8JM-qz1q2bLiiADWbRw1Av411MU22q8VKOOJY_HwjOZ1cxXBAK9nPNTu8tlENdhiAlS7aEoobvhqzt8Q4C8u4gSeWeUbigpcmQALl5LCgmn0W-pwOs3C0uoEcJ2K1Ld0jrQQP7cZrlV9tIWQ8Ef82pwpfcKTqK2KmXisOrR1EssrvE1w72k9XzMw3RqTg6rYclTOr5yzC1IWs_NEWKFMKlNDdRYNhxmMhhDAGNBCCxz5G6ld3N6Xg9s4NzaGed5xQnYctYvgcypUwQuY9Tc17A",
          client_id: "78zlzugkv3i3g5",
          client_secret: "WPL_AP1.ScEjtIs017qIZSqV.TekPPw==",
        },
      }
    );

    accessToken = response.data.access_token;
    expiresAt = Date.now() + response.data.expires_in * 1000;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
  }
}

// Middleware to check token expiration
async function ensureValidToken(req, res, next) {
  if (!accessToken || Date.now() >= expiresAt) {
    await refreshAccessToken();
  }
  req.accessToken = accessToken;
  next();
}

// const LINKEDIN_ACCESS_TOKEN =
//   "AQVofqtTLTD6Kp8SIX2aaUlMN5fMaozsAnXHqZq7yQ2AaNPLdEgb3rgx0PYH8HJXuG8iUWyPUy2B_qg72swkZIx-k1LAPB5SAPLKdXBDyR20k7wIN-g4wZF803fyKWwe4Fu1A_PkfAvemveRwy24sLw2uS--WybT2q53v3TPjmVlrG058iJPDtq4wnvPTPijU4hgWh6b6ilwGx_lq7niHeijxIX2GPWfSwu-0dBKrbqtfARZpxeJTyLUIVotZkKJaA88U5HZSk_dk3AcrfepKmTRsFWan9ArKb6LufTWqPyNtNpTdymZXxW-PRZo08HpCt34_Gc5TH2gfLoiY9rxRSgvoxDr7g";
const LINKEDIN_ACCESS_TOKEN =
  "AQUroKGX2x0O9uDPcXgSk84OuhnliXWDu6RO_eMjo-bKvJyEImUD_cG_nrxxiGiYgtArCEMdTdzSwppdqLLtbn1mLvW8csAfHw7WGfKE-T2uFDzv3k2Eo1KcLAjZeyRDSYrt2Q07zX70F6eTRAcnWGNPGoFaa1VRAUSYJL_Akhwpd-kzMIrviKO2nnB3q9k4AOLAYgVVRxtXPMAKExSWN7QzNCKsHkf40T6VeKU2_FB5F5RKE9gHzuqJrKwXXkbMwWnqShqynSW4edAaFapX5PiB97O0ColChJYHuz3Rc3HAjFyz8dsPyB-MIBVbAn7B6rsxJEllyMxmycBqm3-cjg7umIMR3g";

const ORGANIZATION_ID = "106264553";

app.get("/linkedin-stats", ensureValidToken, async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${ORGANIZATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        },
      }
    );
    // console.log(response, "prolink-infotech-222013625");
    // res.json(response.data);
    // res.status(200).json({ response });
    return res.send(response?.data);
  } catch (error) {
    console.log("error--::", error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.get("/auth/callback", async (req, res) => {
  const authCode = req.query.code;
  if (!authCode) {
    return res.send("Authorization code not found in the URL.");
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: "AQS2SnJzVUh9E1aJrp2O6TG0CehtJ5h92Yf8gx4ZhmW0SfdjRNLs_Rcr0NDKSOmXvtC8cdhWvBGzZFW3rEmXSH7IehaMMpzA96Ii3FF2LVlh0x-xeaxHBBOpzlH1EV4bF6llLW9nqemo3r565w157n5GEUm1se1-zn35ZE4GCPXhgEnAWUG9fdY4w_r1k9vp-gfxtWH5CvThbj78Veo",
        redirect_uri: "http://127.0.0.1:8000/auth/callback",
        client_id: "78zlzugkv3i3g5",
        client_secret: "WPL_AP1.ScEjtIs017qIZSqV.TekPPw==",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    console.log(tokenResponse, "tokenResponse");
    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken, "accessToken");

    res.send(`Your Access Token: ${accessToken}`);
  } catch (error) {
    console.error(
      "Error obtaining access token:",
      error.response?.data || error.message
    );
    res.status(500).send("Error obtaining access token.");
  }
});

const INSTAGRAM_BUSINESS_ID = "655257150356968"; // Your Instagram business account ID
const ACCESS_TOKEN =
  "IGAAJT8ZCGuZCehBZAE5XUE9sbkY5M2xJMkRPbTh5TnRfTDRndnoyeHRJN3dMbHBaUFVjbkFLVXRnUG1Ta09Na2FwbTlNeUxPNVUxUlJmdHpQaWV4bmFEektKN2x4UkVsMk1rOUZAZAQk1NaDhmdUhfc2VvUndsVTJ5VkFJNHkzUE5NawZDZD"; // Your long-lived access token

app.get("/instagram/insights", async (req, res) => {
  console.log("hhhhhhhhh");

  try {
    const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_BUSINESS_ID}/insights?metric=impressions&period=day&access_token=${ACCESS_TOKEN}`;
    console.log("uuuuuuuuuu", url);

    const response = await axios.get(url);
    console.log(response.data, "response.data");
    console.log("kkkkkkkkkkk");

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

if (process.env.HTTPS === true || process.env.NODE_ENV === "production") {
  const server = https
    .createServer(options, app)
    .listen(process.env.PORT || port, function (req, res) {
      const protocol =
        process.env.HTTPS === true || process.env.NODE_ENV === "production"
          ? "https"
          : "http";
      const { address, port } = server.address();
      const host = address === "::" ? "127.0.0.1" : address;
      console.log(
        `------- if Server listening at ${protocol}://${host}:${port}/`
      );
    });
} else {
  const server = app.listen(process.env.PORT || port, () => {
    const protocol =
      process.env.HTTPS === true || process.env.NODE_ENV === "production"
        ? "https"
        : "http";
    const { address, port } = server.address();
    const host = address === "::" ? "127.0.0.1" : address;
    console.log(
      `------- else Server listening at ${protocol}://${host}:${port}/`
    );
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
const DATABASE_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const DATABASE = process.env.DB || "Carbon";

db(DATABASE_URL, DATABASE);
