//payload.js
var _conf = require('../config.js');	
var _utils = require('../../../utils/utils.js');	
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
					  //,
					//{ "parentId": _conf.wily_integration_namespace_ids[1],
					//  "id": _conf.wily_integration_namespace_ids[2] + "SAP",
					//  "name": _conf.wily_integration_namespace_labels[2],
					//  "properties":{}, 
					//  "markedForDelete":false },
					//{ "parentId": _conf.wily_integration_namespace_ids[2] + "SAP",
					//  "id": _conf.wily_integration_namespace_ids[3] + "SAPLOGIN",
					//  "name":"SAP_LoginResponseTime",
					//  "properties":{}, 
					//  "markedForDelete":false }	
					  ],
					  "parameters" : {
						     [_conf.wily_integration_namespace_ids[0]] :{"CollectionStatus":[{"t": _utils.getEpoch(),"v":0.0}]}
					         //[_conf.wily_integration_namespace_ids[2] + "SAP"]:{"Status":[{"t": _utils.getEpoch(),"v":0.0}]}
						     //[_conf.wily_integration_namespace_ids[3]+"SAPLOGIN"]:{"CpuTime":[{"t": _utils.getEpoch(),"v": _utils.randomInterval(0,100)}],"Count":[{"t": _utils.getEpoch(),"v": _utils.randomInterval(0,80)}],"ResponseTime":[{"t": _utils.getEpoch(),"v": _utils.randomInterval(0,10000)}],"FailureRate":[{"t": _utils.getEpoch(),"v": _utils.randomInterval(0,10)}]}
						   }		
					}
			};
