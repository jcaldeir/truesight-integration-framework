// streaming.js

var _server = require('../../conf/config.js'); 
var _console = require('../utils/logger.js');

module.exports = function(io){

 try {
	 	 
		if ( io )
			{
				io.sockets.on('connection', function (socket) {
								
								_console.info( _server.engine_app_name + ' - A new client is now connected over WebSockets to : ' + serverURL);
								_console.info( _server.engine_app_name + ' WebSockets streaming enabled.');
								
								socket.on('event', function (data) {
										socket.broadcast.emit('message', data);	
									});
								
								
								socket.on('monitor', function (data) {
										socket.broadcast.emit('engine', data);	
									});
								
								socket.on('integrations', function (data) {
										socket.broadcast.emit('integrations', data);	
									});
									
									
				});
			
			_console.ok( _server.engine_app_name + ' WebsSckets engine loaded on : ' + serverURL); 
		
		} else { _console.warn( _server.engine_app_name + ' - Could not load WebSockets engine on : ' + serverURL) }   
	 }
	 
	catch(err) {
		_console.error(err);
		_console.warn(_server.engine_app_name + ' - Could not load WebSockets engine on : ' + serverURL);
	}
	
}

