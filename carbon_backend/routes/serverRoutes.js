const express = require('express');
const userRoutes = require('./authRoutes');
const auth = require('../middelwares/auth');

const router = express.Router();

router.use('/auth', userRoutes);

module.exports = router
