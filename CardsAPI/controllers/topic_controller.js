const Topic = require('../models/topic');

module.exports = {
    index(req, res, next) {
        Topic.find({})
            .then((topics) => res.send(topics))
            .catch(next)
    },

    create(req, res, next) {
        const topicProps = req.body;

        Topic.create(topicProps)
            .then((topic) => res.send(topic))
            .catch(next);
    },

    edit(req, res, next) {
        const topicId = req.params.id;
        const topicProps = req.body;

        Topic.findByIdAndUpdate(topicId, topicProps)
            .then(() => Topic.findById(topicId))
            .then((topic) => res.send(topic))
            .catch(next)
    },

    delete(req, res, next){
        const topicId = req.params.id;

        Topic.findByIdAndDelete(topicId)
            .then((topic) => res.status(204).send(topic))
            .catch(next)
    }  
}