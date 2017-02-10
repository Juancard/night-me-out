'use strict';

module.exports = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    res.json({
      error: true,
      message: "You have no permissions to perform this action",
      redirect: "/auth/twitter"
    });
  }
}
