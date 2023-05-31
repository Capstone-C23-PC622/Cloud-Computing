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