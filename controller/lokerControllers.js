const axios = require('axios');
const lokerModel = require('../model/lokerModel');
const response = require('../config/response');
const imgUpload = require('../modules/imgUpload');
const userModel = require('../model/userModel');
const biodataUserModel = require('../model/biodataUserModel');
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

// delete loker by id
exports.deleteLokerById = (_id) =>
    new Promise((resolve, reject) => {
        lokerModel.findByIdAndDelete(_id)
        .then(() => resolve(response.commonSuccessMessage('Loker berhasil dihapus', 200)))
        .catch(() => reject(response.commonErrorMessage('Gagal menghapus Loker', 500)));
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
exports.getProfileById = (userId) =>
    new Promise((resolve, reject) => {
        console.log(userId);
        profilUsahaModel.findOne({ userId: userId })
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



exports.getRecommendedLokers = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                code: '404',
                status: 'Not Found',
                errors: {
                    message: 'User not found',
                },
            });
        }

        console.log(`ID Pemilik: ${userId}`);
        console.log(`Nama pemilik ID: ${user.username}`);

        const biodata = await biodataUserModel.findOne({
            keterampilan: req.body.data.keterampilan,
            peminatan: req.body.data.peminatan,
        });

        if (!biodata) {
            return res.status(404).send({
                code: '404',
                status: 'Not Found',
                errors: {
                    message: 'Biodata not found',
                },
            });
        }

        try {
            const predictResponse = await axios.post(process.env.URL_MACHINELEARNING, {
                keterampilan: req.body.data.keterampilan,
                peminatan: req.body.data.peminatan,
            });

            const predictData = predictResponse.data.data;
            return res.status(200).send({
                code: '200',
                status: 'OK',
                data: predictData,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                code: '500',
                status: 'Internal Server Error',
                errors: {
                    message: 'An error occurred while fetching predicted loker',
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            code: '500',
            status: 'Internal Server Error',
            errors: {
                message: 'An error occurred',
            },
        });
    }
};
