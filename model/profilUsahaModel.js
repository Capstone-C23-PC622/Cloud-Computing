const mongoose = require('mongoose');

const profilUsahaSchema = mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    namaUsaha: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    deskripsiUsaha: {
        type: String,
        required: true
    },
    bidangUsaha: {
        type: String,
        required: true
    },
    image: {
        type: String, 
    },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profilUsahaSchema)