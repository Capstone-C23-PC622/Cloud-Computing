const lokerModel = require('../model/lokerModel');
const response = require('../config/response');
const imgUpload = require('../modules/imgUpload');
const userModel = require('../model/userModel');
const biodataModel = require('../model/biodataUserModel');
const profilUsahaModel = require('../model/profilUsahaModel');

exports.createLoker = (userId, data, file) =>
    new Promise((resolve, reject) => {
    userModel.findById(userId)
        .then((user) => {
        if (user) {
            console.log(`ID Pemilik: ${userId}`);
            console.log(`Nama Pemilik: ${user.username}`);
            lokerModel.findOne({ namaPerusahaan: data.namaPerusahaan })
            .then((loker) => {
                if (loker) {
                resolve(response.commonErrorMessage('Loker sudah tersedia', 400));
                } else {
                if (file && file.cloudStoragePublicUrl) {
                    data.image = file.cloudStoragePublicUrl;
                }
                data.userId = userId; // Assign the user ID to the loker data
                lokerModel.create(data)
                    .then(() => resolve(response.commonSuccessMessage('Berhasil membuat Loker', 200)))
                    .catch(() => reject(response.commonErrorMessage('Gagal membuat Loker', 400)));
                }
            })
            .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
        } else {
            reject(response.commonErrorMessage('User tidak ditemukan', 404));
            }
    })
        .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
});


exports.getAllLoker = () =>
    new Promise((resolve, reject) => {
        lokerModel.find()
        .then((lokers) => {
        resolve(response.commonResult(lokers, 200));
        })
        .catch((error) => {
        reject(response.commonErrorMessage('Gagal mendapatkan loker', 500));
        });
});

exports.getLokerById = (data) =>
    new Promise((resolve, reject) => {
    console.log(data);
    lokerModel.findOne({ _id: data })
        .then((loker) => {
        if (loker) {
            resolve(response.commonResult(loker, 200));
        } else {
            reject(response.commonErrorMessage('Loker tidak ditemukan', 404));
        }
    })
        .catch((error) => {
        reject(response.commonErrorMessage('Gagal mendapatkan loker', 500));
    });
});


exports.createProfile = (userId, data, file) =>
    new Promise((resolve, reject) => {
        userModel
        .findById(userId)
        .then((user) => {
        if (user) {
            console.log(`ID Pemilik: ${userId}`);
            console.log(`Nama pemilik ID: ${user.username}`);
            profilUsahaModel
            .findOne({ namaUsaha: data.namaUsaha })
            .then((profile) => {
                if (profile) {
                resolve(response.commonErrorMessage('Profil Usaha sudah dibuat', 400));
                } else {
                if (file && file.cloudStoragePublicUrl) {
                    data.image = file.cloudStoragePublicUrl;
                }
                data.user = userId;
                profilUsahaModel.create(data)
                .then(() =>
                    resolve(response.commonSuccessMessage('Berhasil membuat Profil Usaha', 200))
                )
                .catch(() =>
                    reject(response.commonErrorMessage('Gagal membuat Profil Usaha', 400))
                );
                } 
            })
            .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
        } else {
            reject(response.commonErrorMessage('User tidak ditemukan', 404));
            }
    })
        .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
});

// get profile usaha by id
exports.getProfileById = (data) =>
    new Promise((resolve, reject) => {
        console.log(data);
        profilUsahaModel.findOne({ _id: data })
        .then((profile) => {
            if (profile) {
                resolve(response.commonResult(profile, 200));
            } else {
                reject(response.commonErrorMessage('Profil Usaha tidak ditemukan', 404));
            }
        })
        .catch((error) => {
        reject(response.commonErrorMessage('Gagal mendapatkan Profil Usaha', 500));
    });
});


// update profile by id
exports.updateProfileById = (_id, newData) =>
    new Promise((resolve, reject) => {
        profilUsahaModel.findByIdAndUpdate(_id, newData, { new: true })
            .then((updatedData) => {
                if (updatedData) {
                    resolve(response.commonUpdateBiodataResult('Profil Usaha berhasil diubah', 200, updatedData));
                } else {
                    reject(response.commonErrorMessage('Profil Usaha tidak ditemukan', 404));
                }
            })
            .catch((error) => {
                reject(response.commonErrorMessage('Gagal memperbarui Profil Usaha', 500));
            });
    });