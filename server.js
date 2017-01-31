// server.js

// BASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var _server = require('./conf/config.js'); 
var _console = require('./server/utils/logger.js');
serverURL = require("os").hostname() + ":" + ( _server.engine_port || 8090 );
integrations_installed = [];
modules_installed = [];

// START THE SERVER
// =============================================================================
// RUN A SECURE(HTTPS) OR INSECURE(HTTP) SERVER
// =============================================================================
_console.ok( _server.engine_app_name + ' Starting');

if ( _server.engine_secure || ( process.argv[2] && process.argv[2] == "secure") ) {
		
		try {
			_console.ok(_server.engine_app_name + ' - Starting HTTPS Server');
			require('./server/engine/https.js')(app);
		}
		catch(err) {
			_console.error(err);
			_console.error(_server.engine_app_name + ' - Could not load server on : ' + serverURL );
			process.exit();
		}
	
	} else { 

			try {
				_console.ok(_server.engine_app_name + ' - Starting HTTP Server');
				require('./server/engine/http.js')(app);
			}
			catch(err) {
				_console.error(err);
				_console.error(_server.engine_app_name + ' - Could not load server on : ' + serverURL );
				process.exit();
			}
						
    }
	
// ADD THE APP MODULES (API, FRONTEND, AUTHENTICATION, etc)
// =============================================================================
if ( _server.engine_load_modules )
  {
	try {
		_console.ok(_server.engine_app_name + ' - Start loading modules');
		require('./server/modules.js')(app);
	}
	catch(err) {
		_console.error(err);
		_console.error(_server.engine_app_name + ' - Could not load modules on : ' + serverURL + "/api");
	}
  }


// ADD THE APP INTEGRATIONS (Wily, Twitter and others)
// =============================================================================
if ( _server.engine_load_integrations )
  {
	try {
		_console.ok(_server.engine_app_name + ' - Start loading integrations');
		require('./server/integrations.js')(app);
	}
	catch(err) {
		_console.error(err);
		_console.error(_server.engine_app_name + ' - Could not load integrations on : ' + serverURL );
	}
  }
  
  _console.ok( _server.engine_app_name + ' Started successfully on : ' + serverURL + '\n\n', true);

