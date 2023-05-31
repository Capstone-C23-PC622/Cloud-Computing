const router = require('express').Router()
const userController = require('../controller/userControllers');

// registrasi 
router.post('/registrasi', (req, res) => {
    userController.registrasi(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err))
})

// login
router.post('/login', (req, res) => {
    userController.login(req.body)
    .then((result) =>res.status(200).json(result))
    .catch((err) => res.status(400).json(err))
})

// biodata
router.post('/biodata', (req, res) => {
    userController.Biodata(req.body)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
