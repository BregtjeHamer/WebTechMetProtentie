var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var Person = require('../models/person');




module.exports.authenticate = function (req, res) {

    // find the user
    Person.findOne({
        name: req.body.name
    }, function (err, person) {

        if (err) throw err;

        if (!person) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (person) {

            // check if password matches
            if (person.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if person is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire person since that has the password
                const payload = {
                    admin: person.admin
                };
                var token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    // message: req.body.name,
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};