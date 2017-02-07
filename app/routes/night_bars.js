'use strict';

module.exports = function (app, appEnv) {

  app.route('/')
			.get(function (req, res) {
				res.render(appEnv.path + '/app/views/index.pug');
			});

}
