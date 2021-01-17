//var mysql = require('mysql');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
  username: Sequelize.STRING
}, {timestamps: false});

var Message = db.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
}, {timestamps: false});

// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
Message.belongsTo(User);
// enables bi-directional associations between Users and Messages
User.hasMany(Message);


User.sync();
Message.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Message = Message;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
// var dbConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

//dbConnection.connect();

//module.exports = dbConnection;