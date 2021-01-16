// var models = require('../models');

var postMessage = require('../models').messages.post;
var getMessage = require('../models').messages.get;
var postUser = require('../models').users.post;
var getUser = require('../models').users.get;

module.exports = {
  messages: {
    get: function (req, res) {

      getMessage(function (err, data) {
        if (err) {
          console.error('error -> ', error);
          return;
        } else {
          res.send(data);
        }
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      postMessage(req.body, (err, result) => {
        if (err) {
          console.log('err ->', err);
        } else {
          res.sendStatus(200);
        }
      } );
      // res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      getUser( (err, data) => {
        if (err) {
          console.error('err -> ', err);
        } else {
          res.send(data);
        }
      } );
    },
    post: function (req, res, next) {
      postUser(req.body, (err, result) => {
        if (err) {
          console.log( 'err', err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  }
};

