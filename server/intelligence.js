//intelligence.js

var _intelligence = require('request');
var _server = require('../conf/config.js');
var _console = require('./utils/logger.js');
			
var exports = module.exports = {};

exports.request = function( apiContext, postData, callback) {
			
	//var auth = "Basic " + new Buffer(_server.truesight_intelligence_username + ":" + _server.truesight_intelligence_token).toString("base64");			
	try {
		
		var url = _server.truesight_intelligence_api + apiContext; 				
		var callOptions = {
						  url : url,
						  body :  JSON.stringify(postData),
						  auth: {
								user: _server.truesight_intelligence_username,
								pass: _server.truesight_intelligence_token,
								sendImmediately: true
							},
							headers: {							
								'Content-Type' : 'application/json'						
							}
						}; 
								
				//_console.raw(callOptions);
				
				if (! postData) { _intelligence.get(callOptions, callback);	return	}
				
				_intelligence.post(callOptions, callback);		
	}
	catch (err) { _console.error(err) }
}

exports.createMetrics = function( postData, callback ) {
		
	exports.request('/v1/batch/metrics', postData, callback )		
		
}

exports.sendMeasurement = function( postData, callback ) {
		
	exports.request('/v1/measurements', postData, callback )		
		
}

exports.sendMeasurementsArray = function( postData, callback ) {
		
	exports.request('/v1/measurementsBatch', postData, callback )		
		
}

exports.sendEvent = function( postData, callback ) {
		
	exports.request('/v1/events', postData, callback )		
		
}
