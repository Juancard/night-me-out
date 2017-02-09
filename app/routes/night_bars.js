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
        let barsJson = JSON.parse(body);
        res.render(appEnv.path + '/app/views/bars.pug', barsJson);
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
        res.json(JSON.parse(body));
      });
    });
}
