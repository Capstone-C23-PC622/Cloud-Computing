const predictionModel = require('../model/predictionModel');

exports.predict = async (req, res) => {
    const inputData = req.body;
        try {
            const predictionResult = await predictionModel.predict(inputData);
    res.json(predictionResult);
        } catch (error) {
    res.status(500).json({ error: error.message });
    }
};
