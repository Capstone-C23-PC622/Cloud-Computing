const mongoose = require('mongoose');

const biodataSchema = mongoose.Schema ({
    nama: {
        type: String,
        required: true
    },
    birthday: {
        day: {
            type: Number
        },
        month: {
            type: Number
        },
        year: {
            type: Number
        }
    },
    alamat: {
        type: String,
        required: true
    },
    deskripsiDiri: {
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
    keterampilan: {
        type: String
    },
    peminatan: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('biodatas', biodataSchema)