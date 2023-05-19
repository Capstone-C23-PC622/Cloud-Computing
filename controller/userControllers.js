const userModel = require('../model/userModel');
const response = require('../config/response');
const bcrypt = require('bcrypt');
const { reject, promise } = require('bcrypt/promises');


exports.registrasi = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({username: data.username})
        .then(user =>{
            if (user) {
                resolve(response.commonErrorMessage('Username sudah digunakan'))
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {                     //mengengkripsi password
                    if(err) {
                        reject(response.commonErrorMessage)
                    } else {
                        data.password = hash
                        userModel.create(data)
                            .then(() => resolve(response.commonSuccesMessage('Akun berhasil terdaftar')))
                            .catch(() => reject(response.commonErrorMessage('Akun gagal terdaftar')))
                    }
                })
            }
        }).catch(() => reject(response.commonError))
    })

exports.login = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then(user => {
            if(user) {
                if(bcrypt.compareSync(data.password, user.password)) {              //untuk mendekripsi password
                    resolve(response.commonResult(user))
                } else {
                    reject(response.commonErrorMessage('Password yang dimasukan salah'))
                } 
            } else {
                reject(response.commonErrorMessage('Username tidak ditemukan'))
            }
        })
    })

// exports.createBiodata = (data) => 
//     new Promise((resolve, reject) => {
//         biodataModel.create(data)
//         .then(() => resolve(response.commonSuccessMessage('Biodata berhasil dibuat')))
//         .catch(() => reject(response.commonErrorMessage('Gagal membuat biodata')));
//     });
    
//     exports.getBiodata = () => new Promise((resolve, reject) => {
//         biodataModel.find()
//         .then((biodatas) => resolve(response.commonResult(biodatas)))
//         .catch(() => reject(response.commonErrorMessage('Gagal mendapatkan biodata')));
//     });
