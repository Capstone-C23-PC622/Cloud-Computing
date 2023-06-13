const lokerModel = require('../model/lokerModel');
const response = require('../config/response');
const imgUpload = require('../modules/imgUpload');
const userModel = require('../model/userModel');
const biodataModel = require('../model/biodataUserModel');

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


exports.getMatchingLokers = async (req, res) => {
    const userId = req.params.userId;
    try {
      // Mendapatkan data biodata pengguna berdasarkan userId
        const biodata = await biodataModel.findOne({ userId });
        if (!biodata) {
        return res.status(404).json({ error: 'Biodata tidak ditemukan' });
        }
      // Mengambil loker yang sesuai berdasarkan data biodata
        const matchingLokers = await lokerModel.find({
            jenisLowongan: biodata.peminatan,
            pendidikan: biodata.pendidikan,
            pengalaman: { $gte: biodata.pengalaman }
        });

        res.status(200).json({ lokers: matchingLokers });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil loker' });
    }
};