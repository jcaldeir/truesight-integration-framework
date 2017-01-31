//appliance.js

require('shelljs/global');
var _console = require('./utils/logger.js');
var _server = require('../conf/config.js');
var Utils = require('./utils/utils.js') 
	
var exports = module.exports = {};

var protocol = 'http';
		if (_server.engine_secure) protocol = protocol + 's';
		
        socket = require('socket.io-client')(protocol + '://' + 'localhost' + ':' + _server.engine_port)
		
//var SERVER_PATH = './server/';

exports.checkNode = function(req,res) {
	
	// Sync call to exec()
	//var version = exec('node --version', {silent:false}).output;
	//_console.log('Node version :', version);
	//res.json( {"version": version } );
	
	// Async call to exec()
	exec('node --version', function(status, output) {
	  _console.log('Exit status:', status);
	  _console.log('Program output:', output);
      res.json({"version": output })
	});

};

exports.login = function(req,res) {
	
	// Async call to exec()
	exec("cls", function(status, output) {
	  _console.log('Exit status:', status);
	  _console.log('Program output:', output);
	  res.json( {"exit":status, "status":"LOGGEDIN", "output":output} );
	});	
	
};

exports.engine_status = function() {	
	return { "name" : "Integration Engine", "code": 0, "status": "label-success", "message": "Running", "fields": "" };
}

exports.proxy_status = function() {	
	return { "name" : "PDI REST Proxy", "code": 0, "status": "label-success", "message": "Running", "fields": "" };
}

exports.messaging_status = function() {	
	return { "name" : "PDI Messaging Server", "code": 0, "status": "label-success", "message": "Running", "fields": "" };
}

exports.api_status = function() {	
	return { "name" : "Management API", "code": 0, "status": "label-success", "message": "Running", "fields": "" };
}

exports.authentication_status = function() {
	//return { "code": 0, "status": "label-warning", "message": "No Authentication", "fields": "" }
	return { "name" : "Authentication", "code": 0, "status": "label-success", "message": "Using Basic Authentication", "fields": "" };
}

exports.security_status = function() {
	//return { "code": 0, "status": "label-warning", "message": "Insecure : Running over HTTP", "fields": "" };	
	return { "name" : "Privacy", "code": 0, "status": "label-success", "message": "Secure : Running over HTTPS", "fields": "" };
}

exports.native_integrations_status = function() {
	
	var native_integrations = [];
	
	if ( _server.truesight_operations_enabled )	{
			
			native_integrations.push ( { "name" :  _server.truesight_operations_name, "label" :  _server.truesight_operations_name, "theme": 'warning', "icon" : "fa-bank", "status": "Publish Enabled" } );
		}
	
		if ( _server.truesight_intelligence_enabled )	{
			
			native_integrations.push ( { "name" :  _server.truesight_intelligence_name, "label" :  _server.truesight_intelligence_name, "theme": 'warning', "icon" : "fa-bank", "status": "Publish Enabled"  } );
		}
	
		if ( _server.truesight_pulse_enabled )	{
			
			native_integrations.push ( { "name" :  _server.truesight_pulse_name, "label" :  _server.truesight_pulse_name, "theme": 'warning', "icon" : "fa-bank", "status": "Publish Enabled"  } );
		}
	
   return native_integrations;	
	
}

exports.status = function(req,res) {
	
	var status = { engine : exports.engine_status(),
	               proxy : exports.proxy_status(),
				   messaging : exports.messaging_status(),
				   api : exports.api_status(),
				   authentication : exports.authentication_status(),
				   security : exports.security_status(),
				   native_integrations : exports.native_integrations_status()
				 };
	
	_console.info(status)
	
	socket.emit('monitor', status );
	
	res.json( status );
	
};

exports.integrations = function(req,res) {
					
	_console.info( JSON.stringify( integrations_installed ) )
	
	socket.emit('integrations', integrations_installed );
	
	res.json( integrations_installed );
	
};

exports.execute = function(req,res) {

	//var output = exec(req.params.engine + ' ' + req.params.action, {silent:true}).output;
	
	//_console.log("Command Params : ", req.params)
	
	//_console.log("Output : ", output)
	
	//res.json(output)
	
	// Async call to exec()
	exec(req.params.component + ' ' + req.params.action, function(status, output) {
	  _console.log( "Executing : " + req.params.component + ' ' + req.params.action );
	  _console.log('Exit status:', status);
	  _console.log('Program output:', output);
	  res.json( {"exit":status, "status":"RUNNING", "pid":"12345", "output":output} );
	});	
	
};
