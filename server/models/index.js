var db = require('../db');
// console.error('database -> ', db);
// db.connect();
module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT * FROM messages', function (err, result) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, result);
        }
      });
      // db.end();
    }, // a function which produces all the messages
    post: function (mes, cb) {
      var message = JSON.stringify(mes.message);
      var username = JSON.stringify(mes.username);
      var roomname = JSON.stringify(mes.roomname);

      db.query( `INSERT INTO messages (text, roomname_id, user_id) VALUES ( ${message}, ${roomname}, ${username})`,
        function (err, result) {
          if (err) {
            console.error('err -> ', err);
            cb(err, null);
          } else {
            cb(null, result);
            console.log('message sent');
          }
        });
    } // a function which can be used to insert a message into the database
  },
  users: {
    // Ditto as above.
    get: function (cb) {
      db.query( 'SELECT * FROM users', function (err, result, fields) {
        if (err) {
          console.error('err -> ', err);
          cb(err, null);
        } else {
          cb(null, result);
        }
      });
    },
    post: function (user, cb) {
      console.error('user looks like -> ', user);
      var user = JSON.stringify(user.username);
      db.query(`INSERT INTO users (username) VALUES (${user})`, function (err, result, fields) {
        if (err) {
          //console.error('err -> ', err);
          cb(err, null);
        } else {
          //console.log('user posted');
          cb(null, result);
        }
      });
    }
  }
};


