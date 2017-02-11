'use strict';

var Bar = require('../models/bars.js');

function barHandler () {
  this.getBarByYelpId = (yelpId, callback) => {
    console.log("database search: ", yelpId, {yelpId});
    Bar
      .findOne({yelpId})
      .exec( (err, result) => {
        if (err) return callback(err);
        return callback(false, result);
      });
  },

  this.getUsersGoing = (yelpJson, callback) => {
    let barsIds = []
    for (let bar in yelpJson.businesses){
      barsIds.push(yelpJson.businesses[bar].id);
    }
    Bar
      .find({yelpId: {$in: barsIds} })
      .exec( (err, result) => {
        if (err) return callback(error);
        return callback(false, result);
      });
  },

  this.userGoing = (yelpId, userId, callback) => {
    this.getBarByYelpId(yelpId, (err, bar) => {
      if (err)
        return callback("Error: on retrieving bar info from database. Please try again later");

      if (!bar)
        bar = Bar.newInstance(yelpId, []);

      let index = bar.usersGoing.indexOf(userId);
      if (index > -1) {
        bar.usersGoing.splice(index, 1);
      } else {
        bar.usersGoing.push(userId);
      }

      bar.save( (err, result) => {
        if (err) return callback("Error: on saving bar. Please try again later");
        callback(false, result);
      });
    });
  }
}

module.exports = barHandler;
