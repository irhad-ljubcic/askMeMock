const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {           
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,               
            });           
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
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

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    console.log("BODY",req.body);
    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/hot', passport.authenticate('jwt', { session: false }), (req, res) => {
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
                res.json("Can't find question")
            } else {
                result.sort(function(a,b){return b.questions.length - a.questions.length})
                var result = result.slice(0,20);
                return res.json({
                    users: result.map((result) => {
                      return {
                          _id:result._id,
                          name:result.name,
                          email:result.email,
                          numberOfQuestions:result.questions.length
                      }
                    }),                    
                  });
            }
        });
});
router.get('/questions', passport.authenticate('jwt', { session: false }),(req, res) => {
    
    User.findOne({ email:req.user.email })
        .sort({ createdAt: 'desc' })
        .populate('questions')
        .then((result) => {
            if (!result) {
                res.json("Can't find question")
            } else {
                return res.json({
                    questions: result.questions
                })
            }
        });
});

module.exports = router;