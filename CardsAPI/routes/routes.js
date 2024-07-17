const HealthController = require('../controllers/health_controller')
const CourseController = require('../controllers/course_controller');

module.exports = (app) => {
    app.get('/api', HealthController.greeting);
    //--- Courses ---
    app.get('/api/courses', CourseController.index);
    app.post('/api/courses', CourseController.create);
    app.put('/api/courses/:id', CourseController.edit);
    app.delete('/api/courses/:id', CourseController.delete);
};