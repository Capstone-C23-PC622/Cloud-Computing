const predictionModel = require('../model/predictionModel');

exports.predict = async (req, res) => {
    const { jobseeker  } = req.body; 
    try {
        const predictionResult = await predictionModel.predict(jobseeker);
        res.json(predictionResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
