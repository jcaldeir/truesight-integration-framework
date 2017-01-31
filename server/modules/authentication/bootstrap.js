// frontend.js

var _server = require('../../../conf/config.js'); 
var console = require('../../utils/logger.js');

module.exports = function(app){

 try {
		if ( _server.engine_requireAuth )
			{
				var basicAuth = require('basic-auth-connect');
				app.use(basicAuth(_server.engine_username, _server.engine_password));
				console.info("Access using Basic Authentication") 
			} else { console.warn("Not using Authentication")  }
	
	 }
	catch(err) {
		console.warn('TrueSight Integration - Could not load the Authentication on : ' + serverURL);
	}

}

