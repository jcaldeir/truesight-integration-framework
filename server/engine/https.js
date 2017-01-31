// https.js

var fs = require('fs'), stats;
var https = require('https');
var shell = require('shelljs/global');
var _secure = require('../../conf/security.js');  
var _server = require('../../conf/config.js');
var _console = require('../utils/logger.js');

//var port = process.env.PORT || 8090;        // set our port

module.exports = function(app){

	////Start HTTPS Server
	////
		
		process.env['OPENSSL_CONF'] = __dirname + _secure.opensslConfig;
        //_console.ok(process.env.OPENSSL_CONF);
		
		try {
		
		  stats = fs.statSync(__dirname + _secure.certPath);
		  _console.info(_server.engine_app_name + " - Server Certificate exist.");
		  
		  var options = {
			  key: fs.readFileSync( __dirname + _secure.keyPath ),
			  cert: fs.readFileSync( __dirname + _secure.certPath )
		  };
		
			try {
				serverURL = 'https://' + serverURL;
				_console.info(_server.engine_app_name + ' - Starting a Secure/HTTPS Server')
				var server = https.createServer(options, app).listen( _server.engine_port || 8090 );
				io = require('socket.io').listen(server);
				
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
			catch (e) {
				 _console.error(e);
				 _console.error(_server.engine_app_name + ' failed to start on : ' + serverURL);
				}
				
		}
		catch (e) {
		  //_console.error(e);
		  //_console.info( __dirname + _secure.generateCertificateCommand )
		  _console.warn(_server.engine_app_name + " Server Certificate does not exist. Generating Certificate...");
		  exec( __dirname + _secure.generateCertificateCommand, function(status, output) {
			  _console.info("Certificate creation.... Done.");
			  _console.ok("Restart the Server...");
			  process.exit();
			});
	   }
	   
	////
	////Start HTTPS Server
	

}

