const lokerModel = require('../model/lokerModel');
const response = require('../config/response');
const imgUpload = require('../modules/imgUpload');

exports.createLoker = (data, file) =>
    new Promise((resolve, reject) => {
    console.log(data);
    lokerModel.findOne({ namaPerusahaan: data.namaPerusahaan })
        .then(loker => {
        if (loker) {
            resolve(response.commonErrorMessage('Loker sudah tersedia', 400));
        } else {
            if (file && file.cloudStoragePublicUrl) {
            data.image = file.cloudStoragePublicUrl;
            }

            lokerModel.create(data)
            .then(() => resolve(response.commonSuccessMessage('Berhasil membuat Loker', 200)))
            .catch(() => reject(response.commonErrorMessage('Gagal membuat Loker', 400)));
        }
    })
        .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
});

exports.getAllLoker = () =>
    new Promise((resolve, reject) => {
        lokerModel
        .find()
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
