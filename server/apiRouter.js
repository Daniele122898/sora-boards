const router = require('express').Router();
const axios = require('axios');

const soraPort = process.env.NODE_ENV === 'production' ? 8087 : 8187;

module.exports = router;