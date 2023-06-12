const express = require('express');
const router = express.Router();
const predictionController = require('../controller/predictionController');

router.post('/jobs', predictionController.predict);

module.exports = router;
