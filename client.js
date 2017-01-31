// client.js

// BASE SETUP
// =============================================================================
const random = require('node-random-number')
var _client = require('./client/rest.js'); 
var _conf = require('./conf/config.js');  


// START THE CLIENT
// =============================================================================

function poll()

{
	var _interval =  random() * 1000;
	
	_client.call("getdevice", ( _interval / 1000 ) );
	_client.call("getcustomer", ( _interval / 1000 ) );
	
	setTimeout( poll, _interval );
	
}

poll();
