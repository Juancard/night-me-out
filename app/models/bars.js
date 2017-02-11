'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
	yelpId: String,
	usersGoing: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

Bar
  .statics
  .newInstance = function newInstance(yelpId, usersGoing=[]) {
  let newBar = new this();

  newBar.yelpId = yelpId;
	newBar.usersGoing = usersGoing;

  return newBar;
}

module.exports = mongoose.model('Bar', Bar);
