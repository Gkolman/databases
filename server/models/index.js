var db = require('../db');
console.log('database -> ', db);
module.exports = {
  messages: {
    get: function () {
      db.connect(function(err) {
        if (err) { throw err; }
        db.query( 'SELECT * FROM messages', function (err, result, fields) {
          if (err) { throw err; }
          console.log('result -> ',result);
        });
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },
  // get retrieve  select * messages;
  // post insert .. .value
  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

