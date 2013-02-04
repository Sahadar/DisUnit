'use strict';

var deferred = require('deferred'),
	io = require('socket.io');

var socket = null;

(function() {
	var data = {
		io : null
	};

	socket = {
		startSocket : function(app) {
			io = io.listen(app);
			//socketio part
			io.sockets.on('connection', function (socket) {
				socket.emit('news', { hello: 'world' });
				socket.on('hello', function (data) {
					console.log(data);
				});
			});

			data.io = io;
			return io;
		}
	}
})();

module.exports = socket;