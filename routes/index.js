var express = require('express');
var router = express.Router();

var Account = require('../models/account'),
    Company = require('../models/company'),
    Equipment = require('../models/equipment'),
    Location = require('../models/location'),
    Model = require('../models/model'),
    Status = require('../models/status'),
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

  var updates = [];
  var processedTypes = 0;
  var totalTypes = 3;

  var process = function(type, items) {

    for(var _i = 0; _i < items.length; _i++) {
      var item = items[_i];
      updates.push({
        type: type,
        data: item
      });
    }

    processedTypes++;
    if(processedTypes >= totalTypes)
      render();
  };

  var accountsPromise = Account.find({}).exec();
  var companiesPromise = Company.find({}).exec();
  var statusesPromise = Status.find({}).exec();

  accountsPromise.then(function(accounts) {
    process("account", accounts);
  });
  companiesPromise.then(function(companies) {
    process("company", companies);
  });
  statusesPromise.then(function(statuses) {
    process("status", statuses);
  });

  var render = function() {
    console.log(updates);
    res.render('index', { title: 'Express', updates: updates });
  };

});

router.get('/setup', function(req, res) {
    var moment = require('moment');
    var md5 = require('MD5');

    var acc = new Account({
        username: "RedactedProfile",
        slug: "redactedprofile",
        password: bcrypt.hashSync('Maple62!', 8),
        dateAdded: moment().format('X'),
        dateUpdated: moment().format('X'),
        email: "redactedprofile@gmail.com",
        activated: true,
        apiToken: md5(moment().format('X')),
        recoveryToken: "",
        firstName: "Kyle",
        lastName: "Harrison",
        dateBirth: moment('03/26/1986').format('X'),
        avatarUrl: "silent.coyote1@gmail.com",
        avatarEngine: "Gravitar",
        facebookToken: null,
        twitterToken: null,
        googleToken: null,
        motto: "Semper Fail",
        admin: true
    });
    //acc.save();
});

module.exports = router;
