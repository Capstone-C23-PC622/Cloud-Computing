const router = require('express').Router()
const lokerController= require('../controller/lokerControllers');
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

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

router.post("/uploadImage", multer.single('image'), imgUpload.uploadToGcs, (req, res, next) => {
    const data = req.body
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl
    }

    res.send(data)
})


module.exports = router;