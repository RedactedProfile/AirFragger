var express = require('express');
var router = express.Router();

var Account = require('../models/account'),
    Company = require('../models/company'),
    Equipment = require('../models/equipment'),
    Location = require('../models/location'),
    Model = require('../models/model')
    Status = require('../models/status')
    bcrypt = require('bcrypt')
;

/* GET home page.

This page is a collected "Activity" view from across the site.
This view aggregates:
1. New user registrations
2. Equipment registrations and updates
3. Publically visible status updates
4. Events
5. Field registrations and updates
 */
router.get('/', function(req, res) {

    var items = [];

    Account.find({})
        .exec(function(err, accounts) {
            accounts.forEach(function(value) {
                items.push({
                    type: "account",
                    data: value
                });
            });
        });
    
    Company.find({})
        .exec(function(err, companies) {
            companies.forEach(function(value) {
                items.push({
                    type: "company",
                    data: value
                });
            })
        });

    Status.find({})
        .exec(function(err, statuses) {
            statuses.forEach(function(value) {
                items.push({
                    type: "status",
                    data: value
                });
            })
        });

    res.render('index', { title: 'Express', updates: items });
});

router.get('/setup', function(req, res) {
    var acc = new Account({
        username: "RedactedProfile",
        slug: "redactedprofile",
        password: ,
        dateAdded: String,
        dateUpdated: String,
        email: String,
        activated: Boolean,
        apiToken: String,
        recoveryToken: String,
        firstName: String,
        lastName: String,
        dateBirth: String,
        avatarUrl: String,
        avatarEngine: String,
        facebookToken: String,
        twitterToken: String,
        googleToken: String,
        motto: String,
        admin: Boolean
    });
});

module.exports = router;
