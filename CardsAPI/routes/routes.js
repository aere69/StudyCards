const HealthController = require('../controllers/health_controller');
const CourseController = require('../controllers/course_controller');
const TopicController = require('../controllers/topic_controller');

module.exports = (app) => {
    app.get('/api', HealthController.greeting);
    //--- Courses ---
    app.get('/api/courses', CourseController.index);
    app.post('/api/courses', CourseController.create);
    app.put('/api/courses/:id', CourseController.edit);
    app.delete('/api/courses/:id', CourseController.delete);
    //--- Topics ---
    app.get('/api/topics', TopicController.index);
    app.post('/api/topics', TopicController.create);
    app.put('/api/topics/:id', TopicController.edit);
    app.delete('/api/topics/:id', TopicController.delete);
};