//wily_xml.js

var decache = require('decache');
var fs = require('fs')
var _conf = require('../config.js');
var console = require('../../../utils/logger.js');
var Utils = require('../../../utils/utils.js');
var TrueSight = require('../../../truesight.js');
	
var exports = module.exports = {};

exports.getData = function(req, res) {
    
	//Put your code to get data from Wily here
	
	console.info('GetData from Wily Working');	
	//res.send("GetData Wily Working");
	

	function getMetricData_callback(err, data) {
		
		//console.log("\n" + data);							   
		var metrics = JSON.parse(data); 
	    //console.raw( metrics );
        //console.raw( metrics.length );			
		
		
		var Payload = require('./payload2')
		var parameters = Payload.truesight.data.parameters; //{};
		var parms = {};
		var vals = []
		var stamp;
										
					for ( i = 0 ; i < metrics.length ; i++ ) {    			
					
							stamp = new Date();
							vals = [];
							parms = {};
							
							if ( metrics[i].parameter ) {
								
							var p = metrics[i].parameter.split(' ').join('').split(':')
							
							} else { continue; }
							
							var newInstanceTmp = p[0].split('/').join('_').split('~').join('_').split('.').join('_').split('-').join('_').split('@').join('_').split('(').join('_').split(')').join('_');
							var newInstance = (newInstanceTmp.substring(newInstanceTmp.lastIndexOf('_'))).split('_').join('');
							
							//console.log (newInstance);
							
							if ( parameters[_conf.wily_integration_namespace_ids[3] + newInstance ] ) {
								
							  parms = parameters[_conf.wily_integration_namespace_ids[3] + newInstance ];
							  //parms = parameters[_conf.wily_integration_namespace_ids[3] + metrics[i].module.split(' ').join('_').toUpperCase()];
							}
							
							vals.push({ "t": stamp.getTime() / 1000, "v": Utils.randomInterval(0,150)}) //metrics[i].value })
																					
							if ( p[1] ) { 
													
							//parms[metrics[i].parameter.split(' ').join('')] = vals;
							parms[p[1].split('(ms)').join('')] = vals;
							//console.raw(_conf.wily_integration_namespace_ids[3] + p[0]);
							//console.raw(parms);
							
							parameters[_conf.wily_integration_namespace_ids[3] + newInstance ] = parms;
													
							} else { continue; } //console.log("Parameter " +  i + " Empty");
																												
							//parameters[_conf.wily_integration_namespace_ids[3] + metrics[i].module.split(' ').join('_').toUpperCase()] = parms;
							
							
							//parameters[metrics[i].instance] = parms;
							//console.raw(parameters);
							
							var found_application = Payload.truesight.data.instances.some(function (el) {
								return el.id === _conf.wily_integration_namespace_ids[2] + metrics[i].software.split(' ').join('_').toUpperCase();
							});
							
							if (!found_application) {
								
								var application = {
								"parentId" : _conf.wily_integration_namespace_ids[1],
								"id" : _conf.wily_integration_namespace_ids[2] + metrics[i].software.split(' ').join('_').toUpperCase(),
								"name" : metrics[i].software.split(' ').join('_').toUpperCase(),
								"properties" : {},
								  //"MetaTokenID" : metrics[i].server, // + "_" + metrics[i].id,
								  //"MetaFQDN" : metrics[i].software //+ "_" + metrics[i].instance
								//},							
								"markedForDelete" : false
							  } 
							  
							parameters[_conf.wily_integration_namespace_ids[2] + metrics[i].software.split(' ').join('_').toUpperCase()] = {"Status":[{"t": Utils.getEpoch(),"v":0.0}]},
							
							Payload.truesight.data.instances.push(application);
							
							
							}
							
							var found_instance = Payload.truesight.data.instances.some(function (el) {
								return el.id === _conf.wily_integration_namespace_ids[3] + p[0] //metrics[i].module.split(' ').join('_').toUpperCase();
							});
							
							if (!found_instance) { 
							
							var instance = {
								"parentId" : _conf.wily_integration_namespace_ids[2] + metrics[i].software.split(' ').join('_').toUpperCase(), //_conf.wily_integration_namespace_ids[2],
								"id" : _conf.wily_integration_namespace_ids[3] + newInstance, //metrics[i].module.split(' ').join('_').toUpperCase(),
								"name" : newInstance, //metrics[i].module.split(' ').join('_').toUpperCase(),
								"properties" : {},
								  //"MetaTokenID" : metrics[i].server, // + "_" + metrics[i].id,
								  //"MetaFQDN" : metrics[i].software //+ "_" + metrics[i].instance
								//},							
								"markedForDelete" : false
							  } 
							
							Payload.truesight.data.instances.push(instance);
							
							}
							
							
							
					}

					//var unique = [...new Set(Payload.truesight.data.instances.map(item => item.id))];					  
					
					//console.raw(Payload.truesight);
					
					TrueSight.publish(Payload.truesight);
					
					decache('./payload2')	
							
			if ( err ) console.error(err);
		
			
	}

	console.log("Wily connector using XML"); 

	fs.readFile(__dirname + '/data/getMetricDataJSON.xml', 'utf8', getMetricData_callback);
	
	if ( res ) res.send( { "code": 0, "message": "RUN_SUCCESS", "fields": "" } );
	     	
}
