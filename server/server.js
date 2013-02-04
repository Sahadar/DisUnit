'use strict';

var express = require('express'),
	deferred = require('deferred'),
	http = require('http'),
	io = require('socket.io');

var server = null;

(function() {
	var data = {
		server : null,
		io : null
	};

	server = {
		startServer : function(port) {
			var app = express()

			//express part
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
			app = app.listen(port);

			io = io.listen(app);
			//socketio part
			io.sockets.on('connection', function (socket) {
				socket.emit('news', { hello: 'world' });
				socket.on('hello', function (data) {
					console.log(data);
				});
			});

			data.server = app;
			data.io = io;
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