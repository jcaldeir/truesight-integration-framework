// http.js

var _server = require('../../conf/config.js');
var _console = require('../utils/logger.js');  

//var port = process.env.PORT || 8090;        // set our port

module.exports = function(app){

	////Start HTTP Server
	////
		
		try {
		
		    serverURL = 'http://' + serverURL;
			_console.warn(_server.engine_app_name + " - Starting an Insecure/HTTP Server")
			io = require('socket.io').listen(app.listen( _server.engine_port || 8090 ));
			
			try {
					_console.info(_server.engine_app_name + ' - Start loading websockets engine');
					require('./websockets.js')(io);
				}
				catch(err) {
					_console.error(err);
					_console.error(_server.engine_app_name + ' - Could not load websockets engine on : ' + serverURL );
				}	
			
			//_console.ok(_server.engine_app_name + ' Started on : ' + serverURL);
			
		}
		catch (err) {
			_console.error(err);
			_console.error(_server.engine_app_name + ' failed to start on : ' + serverURL);
		}
		
	////
	////Start HTTP Server
	

}

