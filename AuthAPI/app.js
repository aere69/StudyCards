const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

process.env.KEY = '23f5311c28c2bdd0187678f59a71de86f47feec427de86795a310d61d3814926f0a6171e5b7ea7bdf01eb6f92326ddb08dcd87b3c3673afc222d64a48c48371f911a9833db4f1d157cdedd997b9f1bc0c28a8e5740a21208d1ea0b7296e9833df082c197f74eadf991e998f6dbfc1328d0181b3e93e277b32d809884042a513525263a75f08ad5874ae452ae4bed174db3cb9f810512610be049e79a6305bae5458d02b21f38c7a7feffe77c6d772c07000a898a13eaa2ea56a5983d96ea085123146e5213596b1e207162c27e15d8c7b1be19604326174d38face1f88663e0c0a21d09b832be129cfdac2fad42ff2182cd50ce191754fe309ce0b5ecd251986';

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/scauth');
};

app.use(bodyParser.json());
routes(app);

//Middleware to handle errors
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;