const mongoose = require('mongoose');

const lokerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    namaPerusahaan: {
        type: String,
        required: true,
        index: true,
    },
    lowongan: {
        type: String,
        required: true,
    },
    jenisLowongan: {
        type: String,
        required: true,
    },
    pendidikan: {
        type: String,
        enum: ['SD', 'SMP', 'SMA/SMK', 'S1/D4'],
        required: true,
    },
    pengalaman: {
        type: String,
    },
    lokasi: {
        type: String,
    },
    deskripsi: {
        type: String,
    },
    image: {
        type: String, 
    },
}, { timestamps: true });

module.exports = mongoose.model('Loker', lokerSchema);
