'use strict';

var express = require('express'),
	deferred = require('deferred'),
	path = require('path');

var server = null;

(function() {
	var data = {
		server : null
	};

	server = {
		startServer : function(port) {
			var app = express();

			app.use(express.logger());
			app.get('/bind/?', function(req, res) {
				if(req.path.substr(req.path.length -1, 1) !== "/") {
				 	res.redirect(req.path+'/');
				} else {
					res.sendfile('index.html', { root: "public/connector/"});
				}
			});
			app.get('/bind/*', function(req, res) {
				res.sendfile(req.params[0], { root: "public/connector/"});
			});
			app.get('/monitor/?', function(req, res){
				if(req.path.substr(req.path.length -1, 1) !== "/") {
				 	res.redirect(req.path+'/');
				} else {
					res.sendfile('index.html', { root: "public/monitor/"});
				}
			});
			app.get('/monitor/*', function(req, res) {
				res.sendfile(req.params[0], { root: "public/monitor/"});
			});
			app.listen(port);
			data.server = app;
		},
		stopServer : function() {
			if(data.server !== null) {
				data.server.close();
			}
			data.server = null;
		}
	}
})();

module.exports = server