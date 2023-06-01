const mongoose = require('mongoose');

const lokerSchema = mongoose.Schema ({
    namaPerusahaan: {
        type: String,
        required: true
    },
    jenisLowongan: {
        type: String,
        required: true
    },
    pendidikan: {
        type: String,
        enum: ['SD', 'SMP', 'SMA/SMK', 'S1/D4'],
        required: true
    },
    pengalaman: {
        type: String
    },
    lokasi: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model('loker', lokerSchema)