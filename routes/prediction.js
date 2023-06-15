const express = require('express');
const router = express.Router();
const predictionController = require('../controller/lokerControllers');

router.post('/jobs', (req, res) => {
    const userId = req.body.userId; // Ganti dengan field yang sesuai dengan ID pengguna dari tabel users
    predictionController.getRecommendedLokers(req, res);
});

module.exports = router;
