const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image_url: user.image_url
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        return res.status(400).json({error:'Incorrect Password'});
                    }
                });
        });
});

router.get('/hot', (req, res) => {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    User.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('questions')
        .exec()
        .then((result) => {
            if (!result) {
                return res.status(400).json({error:'User not found '});
            } else {
                result.sort(function (a, b) { return b.questions.length - a.questions.length })
                var result = result.slice(0, 20);
                return res.json({
                    users: result.map((result) => {
                        return {
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            image_url:result.image_url,
                            numberOfQuestions: result.questions.length
                        }
                    }),
                });
            }
        });
});
router.get('/questions', passport.authenticate('jwt', { session: false }), (req, res) => {
    var limit = 20;
    var page = 0;

    if (typeof req.query.page !== 'undefined') {
        page = (parseInt(req.query.page, 10))
    }

    User.findOne({ email: req.user.email })
        .populate({
            path: 'questions',
            sort: { createdAt: 'desc' },
            options: { limit: Number(limit), skip: Number(page * limit) }
        })
        .then((result) => {
            if (!result) {
                return res.status(400).json({error:'Question not found '});
            } else {
                return res.json({
                    questions: result.questions,
                    page: page + 1,
                    isLastPage: result.questions.length <= limit
                })
            }
        });
});

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findOne({ email: req.user.email })
        .then(user => {
            if (!user) {
                return res.status(400).json({error:'User not found '});
            }
            if (req.body.email != req.user.email) {
                var canUpdate;
                User.find({ email: req.body.email }).countDocuments().then(count => canUpdate = count < 1);
                if (canUpdate) {
                    user.email = req.body.email
                }
                else {
                    return res.status(400).json({error:'Email Allready used '});
                }
            }
            user.name = req.body.username;
            user.image_url = req.body.image_url;
            user.save().then(result => {
                return res.json(result.toProfileJSONFor(result));
            }, (err) => { return res.status(400).json({error:'Unable to save'}); }
            )

        });
});

router.post('/update/password', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findOne({ email: req.user.email })
        .then(user => {
            if (!user) {
                return res.status(400).json({error:'User not found '});
            }
            bcrypt.compare(req.body.old_password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) console.error('There was an error', err);
                            else {
                                bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                                    if (err) console.error('There was an error', err);
                                    else {
                                        user.password = hash;
                                        user
                                            .save()
                                            .then(user => {
                                               return  res.json(user.toProfileJSONFor(user))
                                            });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        return res.status(400).json({error:'Invalid old password'});
                    }
                })
        });
});

module.exports = router;