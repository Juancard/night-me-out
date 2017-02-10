'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
	yelpId: String,
	usersGoing: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Bar', Bar);
