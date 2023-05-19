const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number
    },
})

// const biodataSchema = new mongoose.Schema ({
//     nama: {
//         type: String
//     },
//     birthday: {
//         day: {
//             type: Number
//         },
//         month: {
//             type: Number
//         },
//         year: {
//             type: Number
//         }
//     },
//     alamat: {
//         type: String,
//         required: true,
//     },
//     deskripsiDiri: {
//         type: String,
//         required: true, 
//     },
//     pendidikan: {
//         type: String,
//         enum: ['SD', 'SMP', 'SMA/SMK', 'S1/D4'],
//         requires: true,
//     },
//     pengalaman: {
//         type: String
//     },
//     keterampilan: {
//         type: String
//     },
//     peminatan: {
//         type: String
//     }
// })


module.exports = mongoose.model('users', userSchema)


// const User = mongoose.model('users', userSchema);
// const Biodata = mongoose.model('biodatas', biodataSchema);

// module.exports = { User, Biodata };