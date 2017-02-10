'use strict';

module.exports = function (app, appEnv) {

  let YelpHandler = require(appEnv.path + '/app/controllers/yelpHandler.server.js');
  let yelpHandler = new YelpHandler();

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
      yelpHandler.request(parameters, function(err, response, body){
        let yelpJson = JSON.parse(body);
        let out = {
          query: {
            text: req.query.q
          },
          usersGoing: yelpHandler.getUsersGoing(yelpJson),
          yelpJson,
        }
        res.render(appEnv.path + '/app/views/results.pug', out);
      });
    });
  app.route('/api/search')
    .get((req, res) => {
      let parameters = {
        location: req.query.q,
        sort: '2'
      }
      console.log(parameters);
      yelpHandler.request(parameters, function(err, response, body){
        let yelpJson = JSON.parse(body);
        let out = {
          query: {
            text: req.query.q
          },
          usersGoing: yelpHandler.getUsersGoing(yelpJson),
          yelpJson,
        }
        res.json(out);
      });
    });
}
