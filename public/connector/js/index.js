(function() {
	var socket = io.connect('http://localhost:8181');
	socket.on('connect', function (data) {
		$('.status').addClass('on').text('You have been successfully connected');
		socket.emit('', { my: 'data' });
	});
})();