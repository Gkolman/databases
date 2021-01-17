/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          console.log('results -> ', results);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');
          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var insert = 'INSERT INTO messages (text, roomname) VALUES ("Men like you can never change!", "main")';
    var values = '';
    dbConnection.query( insert + values, function(err, results) {
      if (err) { throw err; }

    });

    var queryString = 'SELECT * FROM messages';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err, results) {
      if (err) { throw err; }

      console.log('results looks like -> ', results);

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        if (error) { throw error; }
        console.log('body looks like -> ', body);
        // body.push('Men like you can never change!');
        var messageLog = JSON.parse(body);
        //messageLog.push('Men like you can never change!');
        console.log('messageLog', messageLog);
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });


  it('Should output first message has Id from the DB', function(done) {
    // Let's insert a message into the db
    var insert = 'INSERT INTO messages (text, roomname) VALUES ("Men like you can never change!", "main")';
    var values = '';
    dbConnection.query( insert + values, function(err, results) {
      if (err) { throw err; }

    });

    var queryString = 'SELECT * FROM messages';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err, results) {
      if (err) { throw err; }
      console.log('results looks like -> ', results);
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        if (error) { throw error; }
        console.log('body looks like -> ', body);
        // body.push('Men like you can never change!');
        var messageLog = JSON.parse(body);
        //messageLog.push('Men like you can never change!');
        console.log('messageLog', messageLog);
        expect(messageLog[0].id).to.equal(1);
        done();
      });
    });
  });

  it('should add user to users and id should auto_increment', function(done) {
    // Let's insert a message into the db
    var insert = 'INSERT INTO users (username) VALUES ("gageAndTrang")';
    var values = '';
    var queryArgs = [];
    // var queryString =

    dbConnection.query(insert, queryArgs, function(err, results) {
      if (err) { throw err; }
      request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
        if (error) { throw error; }
        console.log('body looks like -> ', body);
        // body.push('Men like you can never change!');
        var userLog = JSON.parse(body);
        //messageLog.push('Men like you can never change!');
        console.log('messageLog', userLog);
        expect(userLog[1].id).to.equal(2);
        expect(userLog[1].username).to.equal('gageAndTrang');
        done();
      });
    });
  });
});