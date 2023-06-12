const axios = require('axios');

const predict = async (data) => {
    try {
        const response = await axios.post('https://machinelearning-dot-backend-388012.et.r.appspot.com/predict', data);
    return response.data;
    } catch (error) {
    throw new Error('Failed to make prediction');
    }
};

module.exports = {predict};
