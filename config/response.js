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
            status: status
        }
    },
    commonResult: (data, status) => {
        return {
            error: false,
            message: 'Berhasil memuat data',
            data: data,
            status: status
        }
    },
    commonResultLogin: (data, status) => {
        return {
            error: false,
            status: 200,
            message: 'Login Success',
            data: data
        }
    }

};