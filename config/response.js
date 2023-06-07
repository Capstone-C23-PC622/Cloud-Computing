module.exports = {
    commonError: {
        error: true,
        message: 'Kesalahan pada server',
        status: 500
    },
    commonErrorMessage: (message, status) => {
        return {
        error: true,
        message: message,
        isEmpty: true,
        status: status
        };
    },
    commonSucces: {
        error: false,
        message: 'Berhasil terhubung'
    },
    commonSuccessMessage: (message, status) => {
        return {
            error: false,
            message: message,
            isEmpty: true,
            status: status
        }
    },
    commonResult: (data, status) => {
        return {
            error: false,
            message: 'Berhasil memuat data',
            isVerified: true,
            data: data,
            status: status
        }
    },
    commonResultLogin: (data) => {
        return {
            error: false,
            status: 200,
            isVerified: true,
            message: 'Login Success',
            data: data
        }
    },
    commonUpdateBiodataResult: (message, status, updateData) => {
        return {
            error: false,
            message: message,
            isVerified: true,
            status: status,
            updateData: updateData
        }
    },

};