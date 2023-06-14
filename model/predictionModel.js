const axios = require('axios');

exports.predict = async (longitude, latitude) => {
    try {
    const predictResponse = await axios.post(process.env.URL_MACHINELEARNING, {
        longitude: longitude,
        latitude: latitude,
    }, 
    {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const predictData = predictResponse.data.data;
    return predictData;
    } catch (error) {
    throw new Error('Failed to make prediction');
    }
};
