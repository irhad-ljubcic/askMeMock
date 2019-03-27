const express = require('express');
const router = express.Router();
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');

const Question = require('../../models/Question');
const User = require('../../models/User');
const Comment = require('../../models/Comment');

router.get('/single/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.findById(req.param.id)
        .populate('author')
        .populate('comments')
        .exec()
        .then((question) => {
            if (!question) {
                res.status(400).json({generic:'Could not load question data'})
            } else {
                res.json(question.toJSONFor());
            }
        })
});

router.get('/', (req, res) => {
    var limit = 20;
    var page = 0;

    if (typeof req.query.page !== 'undefined') {
        page = (parseInt(req.query.page, 10))
    }

    Question.find()
        .limit(Number(limit))
        .skip(Number(page * limit))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec()
        .then((result) => {
            if (!result) {
                res.status(400).json({generic:'Could not load question data'})
            } else {
                return res.json({
                    questions: result.map((result) => {
                        return result.toJSONForList(result.author);
                    }),
                    page: page + 1,
                    isLastPage: result.length < limit
                });
            }
        });
});

router.get('/hot', (req, res) => {

    var limit = 20;

    Question.find()
        .limit(Number(limit))
        .sort({ upvotes: 'desc' })
        .populate('author')
        .exec()
        .then((result) => {
            if (!result) {
                res.status(400).json({generic:'Could not load questions data'})
            } else {
                return res.json({
                    questions: result.map((result) => {
                        return result.toJSONForList(result.author);
                    }),
                });
            }
        });
});


router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if(isEmpty(req.body.body)){
        res.status(400).json({body:'Cannot post empty question'})
    }
    User.findOne({ email: req.user.email })
        .then((user) => {
            var question = new Question();
            question.body = req.body.body;
            question.author = user;
            question.save().then(question => {
                user.updateOne({ $push: { questions: question._id } }).then(
                    res => { }
                )
                return res.json(question.toJSONForList(user));
            })
                .catch(err => {
                    return res.status(400).json(res.status(400).json({generic:'Could not save data'}));
                });
        })
});

router.post('/summary', (req, res) => {
    Question.findById(req.body.id)
        .populate('author')
        .populate( {
            path: 'comments',
            model: 'Comment',
            populate: {
              path: 'author',
              model: 'User'
            }
          }    
        )
        .exec()
        .then((result) => {
            if (!result) {
                res.status(400).json({generic:'Unable to get data'})
            } else {
                return res.json({
                    question: result.toJSONFor(result.author)
                });
            }
        }).catch(err => {
            return res.status(400).json({generic:'Unable to get data'});
        });;
});

router.post('/comment', passport.authenticate('jwt', { session: false }), (req, res) => {

    if(isEmpty(req.body.body)){
        res.status(400).json({body:'Cannot post empty comment'})   
    }
    User.findOne({ email: req.user.email })
        .then((user) => {
            var comment = new Comment();
            comment.body = req.body.body;
            comment.author = user;
            Question.findById(req.body.question_id)
                .then(
                    (question) => {
                        comment.question = question;
                        comment.save().then(comment => {
                            question.updateOne({ $push: { comments: comment._id } }).then(
                                 result => {
                                    return res.json(comment.toJSONFor(user));
                                },err => {
                                    res.status(400).json({body:'Can not post  comment'})
                                })
                        },err =>{
                            res.status(400).json({body:'Can not post  comment'})
                        })                       
                    })
                .catch(err => {
                    return res.status(400).json({body:'Unable to save'});
                });
        })
});

router.post('/rating', passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.findById(req.body.id)
        .populate('author')
        .then((question) => {
            req.body.type == 'up' ? question.upvotes++ : question.downvotes++;
            question.save().then(question => {
                return res.json(question.toJSONForList(question.author));
            },err => {
                return res.status(400).json({generic:'Unable to update rating'});
            })
        })
        .catch(err => {
            return res.status(400).json({generic:'Unable to update rating'});
        });
});

router.post('/comment/rating', passport.authenticate('jwt', { session: false }), (req, res) => {
    Comment.findById(req.body.id)
        .populate('author')
        .then((comment) => {
            req.body.type == 'up' ? comment.upvotes++ : comment.downvotes++;
            comment.save().then(comment => {
                return res.json(comment.toJSONFor(comment.author));
            }, err => {
                return res.status(400).json({generic:'Unable to update rating'});
            })
        }, err => {
            return res.status(400).json({generic:'Unable to update rating'});
        })
        .catch(err => {
            return res.status(400).json({generic:'Unable to update rating'});
        });
});

module.exports = router;