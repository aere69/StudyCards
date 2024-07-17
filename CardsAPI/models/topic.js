const mongoose = require('mongoose');
const CardSchema = require('./card');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [CardSchema]
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;