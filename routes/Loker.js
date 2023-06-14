const router = require('express').Router();
const lokerController = require('../controller/lokerControllers');
const Multer = require('multer');
const imgUpload = require('../modules/imgUpload');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // Batasan ukuran file 5 MB
    }
});

// Loker Creation with Image Upload
router.post('/loker', multer.single('image'), imgUpload.uploadToGcs, (req, res) => {
    const lokerData = req.body;
    const userId = req.body.userId; // Mengambil userId dari body permintaan
    if (req.file && req.file.cloudStoragePublicUrl) {
        lokerData.image = req.file.cloudStoragePublicUrl;
    }

    lokerController.createLoker(userId, lokerData, req.file)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});  

// getLokerbyid
router.get('/loker/:id', (req, res) => {
    const id = req.params.id;
    lokerController.getLokerById(id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// Get All Loker
router.get('/loker', (req, res) => {
    lokerController.getAllLoker()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// Profile Creation with Image Upload
router.post('/profile', multer.single('image'), imgUpload.uploadToGcs, (req, res) => {
    const lokerData = req.body;
    const userId = req.body.userId; // Mengambil userId dari body permintaan
    if (req.file && req.file.cloudStoragePublicUrl) {
        lokerData.image = req.file.cloudStoragePublicUrl;
    }

    lokerController.createProfile(userId, lokerData, req.file)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});  

// get Loker by id
router.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    lokerController.getProfileById(id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
}); 

// update profile by id
router.put('/profile/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    lokerController.updateProfileById(id, newData)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});


module.exports = router;
