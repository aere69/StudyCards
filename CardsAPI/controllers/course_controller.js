const Course = require('../models/course');

module.exports = {
    index(req, res, next) {
        Course.find({})
            .then((courses) => res.send(courses))
            .catch(next)
    },

    create(req, res, next) {
        const courseProps = req.body;

        Course.create(courseProps)
            .then((course) => res.send(course))
            .catch(next);
    },    

    edit(req, res, next) {
        const courseId = req.params.id;
        const courseProps = req.body;

        Course.findByIdAndUpdate(courseId, courseProps)
            .then(() => Course.findById(courseId))
            .then((course) => res.send(course))
            .catch(next)
    },

    delete(req, res, next){
        const courseId = req.params.id;

        Course.findByIdAndDelete(courseId)
            .then((course) => res.status(204).send(course))
            .catch(next)
    }
}