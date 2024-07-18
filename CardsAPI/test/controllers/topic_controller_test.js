const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Topic = mongoose.model('topic');

describe('Topic Controller', () => {
    it('GET to /api/topics find topics and cards', (done) => {
        const topic1 = new Topic({ name: 'Topic1', cards: [{ title: 'Topic1 Card1', text: 'Topic1 card1 text' }, { title: 'Topic1 Card2', text: 'Topic1 card2 text' }]});
        const topic2 = new Topic({ name: 'Topic2', cards: [{ title: 'Topic2 Card1', text: 'Topic2 card1 text' }]});

        Promise.all([topic1.save(), topic2.save()])
            .then(() => {
                request(app)
                    .get('/api/topics')
                    .end((err,response) => {
                        assert(response.body.length === 2);
                        assert(response.body[1].cards.length === 1);
                        assert(response.body[0].name === 'Topic1');
                        assert(response.body[1].cards[0].title === 'Topic2 Card1');
                        assert(response.body[0].cards[1].text === 'Topic1 card2 text');
                        done();
                    })
            })
    });

    it('POST to /api/topics create a new topic', (done) => {
        Topic.countDocuments()
            .then((count) => {
                request(app)
                    .post('/api/topics')
                    .send({ name: 'Topic1', cards: [{ title: 'Topic1 Card1', text: 'Topic1 card1 text' }, { title: 'Topic1 Card2', text: 'Topic1 card2 text' }]})
                    .end(() => {
                        Topic.countDocuments()
                            .then((endCount) => {
                                assert(count + 1 === endCount);
                                done();
                            })
                    })
            })
    });

    it('PUT to /api/topics/{id} edit an existing topic', (done) => {
        const theTopic = new Topic({ name: 'Topic1', cards: [{ title: 'Topic1 Card1', text: 'Topic1 card1 text' }, { title: 'Topic1 Card2', text: 'Topic1 card2 text' }]});

        theTopic.save()
            .then(() => {
                request(app)
                .put(`/api/topics/${theTopic._id}`)
                .send({ name: 'New Topic1' })
                .end(() => {
                    Topic.findOne({ name: 'New Topic1'})
                        .then((topic) => {
                            assert(topic.cards.length === 2);
                            assert(topic.cards[1].text === 'Topic1 card2 text');
                            done();
                        })
                })
            })
    });

    it('DELETE to /api/topics/{id} delete an eisting topic', (done) => {
        const theTopic = new Topic({ name: 'Topic1', cards: [{ title: 'Topic1 Card1', text: 'Topic1 card1 text' }, { title: 'Topic1 Card2', text: 'Topic1 card2 text' }]});

        theTopic.save()
            .then(() => {
                request(app)
                    .delete(`/api/topics/${theTopic._id}`)
                    .end(() => {
                        Topic.findOne({ name: 'Topic1'})
                            .then((topic) => {
                                assert(topic === null);
                                done();
                            })
                    })
            })
    });
})