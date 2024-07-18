const mongoose = require('mongoose');

// Establish connection to DB
before((done) => {
    mongoose.connect('mongodb://localhost/studycards_test');    
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

// Clear tables
beforeEach((done) => {
    const { courses, topics } = mongoose.connection.collections;

    // Drop tables
    courses.drop(() => {
        topics.drop(() => {
            done();
        });
    });

    //courses.drop()
    //    .then(() => {
    //        topics.drop()
    //            .then(() => done())
    //            .catch(() => done())
    //    })
    //    .catch(() => done());
        
    //courses.drop()
    //    .then(() => done())
    //    //First time we run it will error table does not exist.
    //    .catch(() => done()); 
});