const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeUser = require('./routes/User');
const mongoose = require('mongoose');
const dbConfig = require('./config/DbConfig');
const cors = require('cors')


mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true 
}) .then(() => console.log("Database Terhubung"))
    .catch(err => console.log(err))
    // useUnifiedTopology: true,
    // useFindAndModify: false, // Opsi ini digunakan untuk menghindari pesan error saat update data
    // useCreateIndex: true // Opsi ini digunakan untuk menghindari pesan error saat membuat index bar
app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/user', require('./routes/User'))

app.get("/", (req, res) => {
    res.send('Response Sucess Sir!!')
})


const PORT = process.env.PORT || 5001
app.listen(PORT, function () {
    console.log('Server berjalan pada port ' + PORT)
})