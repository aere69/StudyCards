const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }]
});

CourseSchema.pre('deleteOne', {document: true}, function(next) {
    const Topic = mongoose.model('topic');
    Topic.deleteMany({_id: { $in : this.topics }})
        .then(() => next());
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;