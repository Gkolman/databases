


var orm = require('../db');
// var usersTable = require('../db').users;
// var user = require('../db').User;
// var message = require('../db').Message;


// console.log('user typeof-> ', typeof(user));
// console.log('message typeof-> ', typeof(message));


module.exports = {
  messages: {
    get: function (cb) {
      var query = 'SELECT messages.id, message.text, message.roomname, users.username FROM messages \
                   LEFT OUTER JOIN users ON (messages.userid = users.id)';
      orm.query(query, (err, data) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, data);
        }
      });
    }, // a function which produces all the messages |
    post: function (mes, cb) {
      var username = JSON.stringify(mes.username);
      var text = JSON.stringify(mes.text);
      var roomname = JSON.stringify(mes.roomname);

      var query = `INSERT INTO messages (userid, text, roomname) \
                    VALUES ( (SELECT id FROM users WHERE username = ${username}), ${text}, ${roomname}) `;
      orm.query(query, (err, data) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, data);
        }
      });
    } // a function which can be used to insert a message into the database
  },
  users: {
    // Ditto as above.
    get: function (cb) {
      // define the querry;
      var query = 'SELECT * from users';


      // orm querry search
      orm.query(query, function(err, results) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
          console.log('result_models_line 54', results);
        }
      });

    },
    post: function (user, cb) {

      var query = `insert into users(username) values ( ${user.username})`;
      orm.query(query, function(err, results) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
          console.log('result_models_line 69', results);
        }
      });
    }
  }
};


