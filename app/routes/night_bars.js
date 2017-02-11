'use strict';

module.exports = function (app, appEnv) {

  let YelpHandler = require(appEnv.path + '/app/controllers/yelpHandler.server.js');
  let yelpHandler = new YelpHandler();
  let BarHandler = require(appEnv.path + '/app/controllers/barHandler.server.js');
  let barHandler = new BarHandler();

  app.param("barYelpId",  (req, res, next, barYelpId) => {

    console.log("Requested yelp id: ", barYelpId);

    yelpHandler.businessRequest(barYelpId, (err, response, body) => {
      if (err) next(err);
      let yelpJson = JSON.parse(body);
      req.barJson = yelpJson;
      return next();
    });
    /*
    // ... VALIDATE POLL ID
    barHandler.getBarByYelpId(pollId, function(err, poll){
      if (err) return next(err);
      if (!poll) return res.render(appEnv.path + '/app/views/404.pug');
      // SAVE POLL
      req.poll = poll
      return next();
    });
    */
  });

  app.route('/')
			.get(function (req, res) {
				res.render(appEnv.path + '/app/views/index.pug');
			});
  app.route('/search')
    .get((req, res) => {
      let parameters = {
        location: req.query.q,
        sort: '2'
      }
      yelpHandler.searchRequest(parameters, function(err, response, body){
        let yelpJson = JSON.parse(body);
        let out = {
          query: {
            text: req.query.q
          },
          yelpJson,
        }
        barHandler.getUsersGoing(yelpJson, (err, result) => {
          if (err) {
            out.usersGoing = [];
          } else {
            out.usersGoing = result;
          }
          res.render(appEnv.path + '/app/views/results.pug', out);
        });
      });
    });
  app.route('/api/search')
    .get((req, res) => {
      let parameters = {
        location: req.query.q,
        sort: '2'
      }
      console.log(parameters);
      yelpHandler.searchRequest(parameters, function(err, response, body){
        let yelpJson = JSON.parse(body);
        let out = {
          query: {
            text: req.query.q
          },
          yelpJson,
        }
        barHandler.getUsersGoing(yelpJson, (err, result) => {
          if (err) {
            out.usersGoing = [];
          } else {
            out.usersGoing = result;
          }
          res.json(out);
        });
      });
    });

    app.route('/api/bar/:barYelpId')
      .get((req, res) => {
        res.json(req.barJson);
      })
      .post(appEnv.middleware.isLoggedIn, (req, res) => {
        let out = {
          yelpId: req.params.barYelpId
        };
        if (req.barJson.error) {
          out.error = true;
          out.message = "Error: " + out.error.text;
        }
        barHandler.userGoing(out.yelpId, req.user.id, (err, result) => {
          res.json(result);
        });
      });

}
