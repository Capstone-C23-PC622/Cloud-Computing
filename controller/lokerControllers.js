const lokerModel = require('../model/lokerModel');
const response = require('../config/response');

exports.Loker = (data) =>
    new Promise((resolve, reject) => {
        console.log(data);
        lokerModel.findOne({ namaPerusahaan: data.namaPerusahaan })
            .then(loker => {
                if (loker) {
                    resolve(response.commonErrorMessage('Loker sudah tersedia', 400));
                } else {
                    lokerModel.create(data)
                        .then(() => resolve(response.commonSuccessMessage('Berhasil membuat Loker', 200)))
                        .catch(() => reject(response.commonErrorMessage('Gagal membuat Loker', 400)));
                }
            })
            .catch(() => reject(response.commonErrorMessage('Terjadi kesalahan', 500)));
    });

exports.getLokerById = (data) =>
    new Promise((resolve, reject) => {
        console.log(data)
        lokerModel.findOne({ _id: data })
            .then((data) => {
                if (data) {
                    resolve(response.commonResult(data, 200));
                } else {
                    reject(response.commonErrorMessage('Biodata tidak ditemukan', 404));
                }
            })
            .catch((error) => {
                reject(response.commonErrorMessage('Gagal mendapatkan biodata', 500));
            });
    });
