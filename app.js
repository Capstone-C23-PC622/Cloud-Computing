const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeUser = require('./routes/User');
const mongoose = require('mongoose');
const dbConfig = require('./config/DbConfig');
const cors = require('cors');

mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database Terhubung"))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/user', routeUser);

app.get("/", (req, res) => {
    res.send('Response Success Sir!!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
    console.log('Server berjalan pada port ' + PORT);
});
