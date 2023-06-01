const router = require('express').Router();
const lokerController = require('../controller/lokerControllers');
const Multer = require('multer');
const imgUpload = require('../modules/imgUpload');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});

// Loker Creation with Image Upload
router.post('/loker', multer.single('image'), imgUpload.uploadToGcs, (req, res) => {
    const lokerData = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
        lokerData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }
    
    lokerController.Loker(lokerData)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

// getLoker
router.get('/loker/:id', (req, res) => {
    const id = req.params.id;
    lokerController.getLokerById(id)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
