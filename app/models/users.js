'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		displayName: String,
		username: String,
	},
	lastQuery: {
		text: String,
		date: Date
	}
});

User
  .statics
  .newInstance = function newInstance(strategy, id, displayName,
		username, lastQuery={text: '', date: null}) {
  let newUser = new this();

  newUser[strategy].id = id;
	newUser[strategy].displayName = displayName;
	newUser[strategy].username = username;
	newUser.lastQuery = lastQuery;

  return newUser;
}

module.exports = mongoose.model('User', User);
