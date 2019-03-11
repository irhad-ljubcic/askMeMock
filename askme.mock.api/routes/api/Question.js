const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//TODO ADD VALIDATION FOR QUESTIONS 

const Question = require('../../models/Question');
const User = require('../../models/User');
const Comment = require('../../models/Comment');

router.get('/single/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Question.findById(req.param.id)
        .populate('author')
        .populate('comments')
        .exec()
        .then((question) => {
            if (!question) {
                res.json("Can't find question")
            } else {
                res.json(question);
            }
        })
});

router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    Question.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec()
        .then((result) => {
            if (!result) {
                res.json("Can't find question")
            } else {
                return res.json({
                    questions: result.map((result) => {
                      return result.toJSONFor(result.author);
                    }),                    
                  });
            }
        });
});

router.get('/hot', passport.authenticate('jwt', { session: false }),(req, res) => {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    Question.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ upvotes: 'desc' })
        .populate('author')
        .exec()
        .then((result) => {
            if (!result) {
                res.json("Can't find question")
            } else {
                return res.json({
                    questions: result.map((result) => {
                      return result.toJSONFor(result.author);
                    }),                    
                  });
            }
        });
});


router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ email:req.user.email })
        .then((user) => {
            var question = new Question();
            question.body = req.body.body;
            question.author = user;
            question.save().then(question => {     
                user.updateOne({$push:{questions : question._id} }).then(
                  res => {console.log("RESPONSE :",res)}
              )
              return res.json(question.toJSONFor(user));
            })
                .catch(err => {
                    console.log("Error:", err);
                   return res.status(400).send("unable to save to database");
                });
        })
});

router.post('/summary', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("UPO");
    Question.findById(req.body.id)
    .populate('author')
    .populate('comments')
    .exec()
    .then((result) => {
        if (!result) {
            res.json("Can't find question")
        } else {
            return res.json({
                question:  result.toJSONFor(result.author)
              });
        }
    });
});
router.post('/comment', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ email:req.user.email })
        .then((user) => {
            var comment = new Comment();
            comment.body = req.body.body;
            comment.author = user;
            Question.findById(req.body.question_id)
             .then(
                (question) => {
                    comment.question = question;
                    comment.save().then(comment => {     
                        question.updateOne({$push:{comments : comment._id} }).then(
                          res => {console.log("RESPONSE 2:",res)}
                      )              
                }              
             )
              return res.json(comment.toJSONFor(user));
            })
                .catch(err => {
                    console.log("Error:", err);
                   return res.status(400).send("unable to save to database");
                });
        })
});

module.exports = router;