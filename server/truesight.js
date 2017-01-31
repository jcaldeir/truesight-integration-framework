//truesight.js

var console = require('./utils/logger.js');
var _server = require('../conf/config.js');
var Client = require('node-rest-client').Client;
var client = new Client();
var endpointid = null;
	
var exports = module.exports = {};

function refreshToken() {
		
		if ( ! _server.truesight_operations_enabled ) return;
		
		getTrueSightOMToken();	
		setTimeout( refreshToken, _server.truesight_refresh_token * 60000 ); // * 60000 from minutes to miliseconds
				  
	}

	refreshToken();
	
function getTrueSightOMToken() {
		
		var url =  _server.truesight_host + ":" + _server.truesight_port + _server.truesight_api_context + _server.truesight_auth_context + "?profile=" + _server.truesight_messaging_queue;
				 
		// set content-type header and data as json in args parameter 
		var args = {
			data: {"service.endpoint.uname": _server.truesight_username, "service.endpoint.passwd": _server.truesight_password, "service.endpoint.sendTo": _server.truesight_send_queue, "service.endpoint.replyTo": _server.truesight_reply_queue }, 
			headers: { "Content-Type": "application/json" }
		};
		
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		
		var request = client.post(url, args, function (data, response) {
			// parsed response body as js object 			
			endpointid = data.id;
			
		    console.ok("Using TrueSight Token : " + endpointid); 
			
			// raw response 
			//console.log(JSON.stringify(response.options));
			
		    return endpointid;
			
		});

		
		request.on('requestTimeout', function (req) {
			console.warn("Token Request has expired");
			req.abort();
		});
		 
		request.on('responseTimeout', function (res) {
			console.warn("Token Response has expired");
		 
		});

		request.on('error', function (err) {
			
			console.error(JSON.stringify(err.request.options));
			console.error('Could not get Token from TrueSight Server..!!!' , err.request.options);
		});

		
		
				  
	}
	
	
function sendTrueSight(payload) {
			 
	 //console.log("Using TrueSight Token : " + endpointid);
	 
     var url =  _server.truesight_host + ":" + _server.truesight_port + _server.truesight_api_context + _server.truesight_payload_context + "?eid=" + endpointid + "&replyTo=" +  _server.engine_host + ":" + _server.engine_port + _server.engine_api_callback;
	
		//console.raw(url); 	
		//console.raw(payload); 
		
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		
			var request = client.post(url, payload, function (data, response) {
			
 		
			//console.info("Response Code : " + response.statusCode)
			//console.info("Response Message : " + response.statusMessage);
			console.info("Response : " + JSON.stringify({"code": response.statusCode, "message": response.statusMessage}))
			//console.raw({"code": response.statusCode, "message": response.statusMessage});
			
			// parsed response body as js object 
			/*			
			var keys = Object.keys(data.toString('utf-8'));
			var keys2 = Object.keys(response);
			
			//console.info("Data Fields : " + keys)
			console.info("Data : " + JSON.stringify(data.toString('utf-8')))
			console.info("Response Fields: " + keys2)			
			console.log("Response Code : " + response.statusCode)
			console.log("Response Message : " + response.statusMessage)
			console.info("Response Req : " + Object.keys(response.req))
			console.info("Response Headers : " + Object.keys(response.headers))
						
			//process.stdout.write(response.tostring());
			//process.stdout.write(textChunk);
			//console.info(JSON.stringify(data));
			// raw response 
			//console.warn(JSON.stringify(response.toString('utf8')));
			*/
			
			if ( response.statusCode == 202 )console.ok("Published to TrueSight"); 
		});
		
		request.on('requestTimeout', function (req) {
			console.warn("Sending Payload Request has expired");
			req.abort();
		});
		 
		request.on('responseTimeout', function (res) {
			console.warn("Sending Payload Response has expired");
		 
		});

		request.on('error', function (err) {
			//console.error(JSON.stringify(err.request.options));
			console.error('Could not send Payload to TrueSight..!!!' + err.request.options);
		});
		
	 //res.send( payload );	 
				  
	}
		
	
function sendIntelligence(payload) {

		console.log(payload);
		
	}
		
 
exports.publish = function(payload) {
 
    if ( ! _server.truesight_operations_enabled ) return;
	
	//Send to TrueSight OM 
	try {
	   sendTrueSight(payload);   
	}
	catch (err) {
		console.error(err);
		console.error("Could not publish to TrueSight"); 
	}
	
	
	//Send to TrueSight Intelligence
	if ( _server.truesight_intelligence_enabled ) {
		
		try {
		   sendIntelligence(result);		   
		}
		catch (err) {
			console.error(err);
			console.error("Could not publish to TrueSight Intelligence"); 
		}
		
	}
	      
};
