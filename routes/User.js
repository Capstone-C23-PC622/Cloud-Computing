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
    const userId = req.body.userId; // Ganti dengan field yang sesuai dengan ID pengguna dari tabel users
    userController.Biodata(userId, req.body.data)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// getbiodata
router.get('/biodata/:id', (req, res) => {
    const id = req.params.id;
    userController.getBiodataByUserId(id)

        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// Update biodata by ID
router.put('/biodata/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    userController.updateBiodataById(id, newData)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// Delete biodata by ID
router.delete('/biodata/:id', (req, res) => {
    const id = req.params.id;

    userController.deleteBiodataById(id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});



module.exports = router;
