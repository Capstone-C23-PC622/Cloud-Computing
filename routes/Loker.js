const router = require('express').Router()
const lokerController= require('../controller/lokerControllers');

// Loker
router.post('/loker', (req, res) => {
    lokerController.Loker(req.body)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// getLoker
router.get('/loker/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    lokerController.getLokerById(id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;