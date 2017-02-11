'use strict';

var User = require('../models/users.js');

function userHandler () {
  this.updateLastQuery = (user, queryText, callback) => {
    User.update(
      { _id: user.id },
      { $set: {
          lastQuery: {
            text: queryText,
            date: new Date()
          }
        }
      },
      callback);
  }
}

module.exports = userHandler;
