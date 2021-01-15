// var models = require('../models');

var postMessage = require('../models').messages.post;
var getMessage = require('../models').messages.get;

var postUser = require('../models').users.post;
var getUser = require('../models').users.get;

module.exports = {
  messages: {
    get: function (req, res) {

      console.log('message get res -> ', res.body);
      console.log('message get req -> ', req.body);
      getMessage();
      res.end();

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      console.log('message post res -> ', res.body);
      console.log('message post req -> ', req.body);
      postMessage(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('users get res -> ', res.body);
      console.log('users get req -> ', req.body);
      getUser();
      res.end();
    },
    post: function (req, res, next) {

      console.log('users post res -> ', res.body);
      console.log('users post req -> ', req.body);
      postUser(req.body);
      res.end();
    }
  }
};

