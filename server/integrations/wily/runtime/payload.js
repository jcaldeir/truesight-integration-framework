//payload.js
var _conf = require('../../conf/config.js');	
var _utils = require('../utils/utils.js');	
var exports = module.exports = {};

exports.truesight = {
			headers: { "Content-Type": "application/json" },
			data : { 
					  "id" : new Date().toString(), //or new Date().toISOString()				   
					  "instances" : [
					{ "parentId":null,
					  "id": _conf.wily_integration_namespace_ids[0],
					  "name": _conf.wily_integration_namespace_labels[0],
					  "properties":{}, 
					  "markedForDelete":false },
					{ "parentId": _conf.wily_integration_namespace_ids[0],
					  "id": _conf.wily_integration_namespace_ids[1],
					  "name": _conf.wily_integration_namespace_labels[1],
					  "properties":{}, 
					  "markedForDelete":false }
					  ],
					  "parameters" : {
						     [_conf.wily_integration_namespace_ids[0]] :{"CollectionStatus":[{"t": _utils.getEpoch(),"v":0.0}]}					        
						   }		
					}
};
