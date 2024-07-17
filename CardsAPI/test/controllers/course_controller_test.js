const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Course = mongoose.model('course');

describe('Course Controller', () => {
    it('GET to /api/courses finds courses and description', (done) => {
        const course1 = new Course({ name: 'Course1', description: "The first Course" });
        const course2 = new Course({ name: 'Course2' });

        Promise.all([course1.save(), course2.save()])
            .then(() => {
                request(app)
                    .get('/api/courses')
                    .end((err, response) => {
                        assert(response.body.length === 2);
                        assert(response.body[1].name === 'Course2');
                        done();
                    })
            })
    });

    it('POST to /api/courses create a new course', (done) => {
        Course.countDocuments()
            .then((count) => {
                request(app)
                    .post('/api/courses')
                    .send({ name: 'Course1' })
                    .end(() => {
                        Course.countDocuments()
                            .then((endCount) => {
                                assert(count + 1 === endCount);
                                done();
                            })
                    })
            })
    });

    it('PUT to /api/courses/{id} edits and existing course', (done) => {
        const theCourse = new Course({ name: 'Course1', description: 'The Course1' });

        theCourse.save()
            .then(() => {
                request(app)
                .put(`/api/courses/${theCourse._id}`)
                .send({ description: 'New Course1' })
                .end(() => {
                    Course.findOne({ name: 'Course1' })
                        .then((course) => {
                            assert(course.description === 'New Course1');
                            done();
                        })
                })
            })
    });

    it('DELETE to /api/courses/{id} can delete a course', (done) => {
        const theCourse = new Course({ name: 'Course', description: 'Course Description' });

        theCourse.save()
            .then(() => {
                request(app)
                    .delete(`/api/courses/${theCourse._id}`)
                    .end(() => {
                        Course.findOne({ name: 'Course' })
                            .then((course) => {
                                assert(course === null);
                                done();
                            })
                    })
            })
    });
})