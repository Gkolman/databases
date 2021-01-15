var db = require('../db');
// console.log('database -> ', db);
//db.connect();
module.exports = {
  messages: {
    get: function (cb) {
      // db.connect(function(err) {
      db.query( 'SELECT * FROM messages', function (err, result) {
        if (err) {
          // console.log('err -> ', err);
          cb(err, null);
          // console.log('field', field);
        }
        cb(null, result);
      });
      // });
      // db.end();
    }, // a function which produces all the messages
    post: function (mes) {
      var message = JSON.stringify(mes.message);
      var username = JSON.stringify(mes.username);
      var roomname = JSON.stringify(mes.roomname);

      db.query( `INSERT INTO messages (text, roomname_id, user_id) VALUES ( ${username}, ${message}, ${roomname})`,
        function (err, result, fields) {
          if (err) { console.log('err -> ', err); }
        });
      // db.end();
    } // a function which can be used to insert a message into the database
  },
  users: {
    // Ditto as above.
    get: function (cb) {
      db.query( 'SELECT * FROM users', function (err, result, fields) {
        if (err) {
          console.log('err -> ', err);
          cb(err, null);
        }

        console.log('result -> ', result);
        cb(null, result);
        console.log('callback -> ', cb);

      });
      // db.end();
    },
    post: function (user) {
      //cb(user);
      console.log('user looks like -> ', user);
      db.query( `INSERT INTO users (username) VALUES (${user.username})`, function (err, result, fields) {
        console.log('result -> ', result);
      });
      // db.end();
    }
  }
};

module.exports.messages.get();

