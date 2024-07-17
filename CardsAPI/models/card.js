const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: String,
    text: String
});

module.exports = CardSchema;
