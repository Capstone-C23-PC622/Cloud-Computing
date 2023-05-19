module.exports = {
    commonError: {
        error: true,
        message: 'Kesalahan pada server'
    },
    commonErrorMessage: (message) => {
        return {
            error: true, 
            message: message
        }
    },
    commonSucces: {
        error: false,
        message: 'Berhasil terhubung'
    },
    commonSuccesMessage: (message) => {
        return {
            error: false, 
            message: message
        }
    },
    commonResult: (data) => {
        return {
            error: false,
            message: 'Berhasil memuat data',
            data: data
        }
    }

};