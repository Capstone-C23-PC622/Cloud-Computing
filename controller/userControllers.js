const userModel = require('../model/userModel');
const biodataUserModel = require('../model/biodataUserModel');
const response = require('../config/response');
const bcrypt = require('bcrypt');
const { reject, promise } = require('bcrypt/promises');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/DbConfig');

exports.registrasi = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({username: data.username})
        .then(user =>{
            if (user) {
                resolve(response.commonErrorMessage('Username sudah digunakan', 400))
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {                     //mengengkripsi password
                    if(err) {
                        reject(response.commonErrorMessage)
                    } else {
                        data.password = hash
                        userModel.create(data)
                            .then(() => resolve(response.commonSuccessMessage('Akun berhasil terdaftar', 200)))
                            .catch(() => reject(response.commonErrorMessage('Akun gagal terdaftar', 400)))
                    }
                })
            }
        }).catch(() => reject(response.commonError))
    })

exports.login = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({ username: data.username })
            .then(user => {
                if (user) {
                    bcrypt.compare(data.password, user.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                const token = jwt.sign({ _id: user._id }, SECRET_KEY);
                                resolve(response.commonResultLogin({ token, user }));
                            } else {
                                reject(response.commonErrorMessage('Password yang dimasukkan salah', 400));
                            }
                        })
                        .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
                } else {
                    reject(response.commonErrorMessage('Username tidak ditemukan', 400));
                }
            })
            .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
    });



exports.Biodata = (data) =>
    new Promise((resolve, reject) => {
        biodataUserModel.findOne({ nama: data.nama, birthday: data.birthday, alamat: data.alamat })
            .then(user => {
                if (user) {
                    resolve(response.commonErrorMessage('Data sudah dibuat', 400));
                } else {
                    biodataUserModel.create(data)
                .then(() => resolve(response.commonSuccessMessage('Berhasil membuat biodata', 200)))
                .catch(() => reject(response.commonErrorMessage('Gagal membuat biodata', 400)));
            }
        })
        .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
    });


    
exports.getBiodataById = (data) =>
    new Promise((resolve, reject) => {
        console.log(data)
        biodataUserModel.findOne({ _id: data })
            .then((data) => {
                if (data) {
                    resolve(response.commonResultBiodata(data, 200));
                } else {
                    reject(response.commonErrorMessage('Biodata tidak ditemukan', 404));
                }
            })
            .catch((error) => {
                reject(response.commonErrorMessage('Gagal mendapatkan biodata', 500));
            });
    });




