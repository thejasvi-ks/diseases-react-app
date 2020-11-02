const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS');
//     next();
// });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     // console.log(req, res);
//     next();
// });

app.options(cors());

app.use(cors());
// app.options('*', cors())

app.use('/api', routes);

mongoose.connect(MONGO_URI).then(result => {
    const server = app.listen(process.env.PORT || 8080 , () => {
        console.log(`Listening on ${ process.env.PORT || 8080}`);
    });

    const io = require('./socket').init(server);

    io.on("connection", (connectedUser) => {
        console.log('Client Connected');
    });
});

