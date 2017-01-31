//wily_ws.js

var decache = require('decache');
var xml2js = require('xml2js');
var dateFormat = require('dateformat');
var request = require('soap');
var _conf = require('../config.js');
var console = require('../../../utils/logger.js');
var Utils = require('../../../utils/utils.js');
var TrueSight = require('../../../truesight.js');

	
var exports = module.exports = {};

exports.getData = function(req, res) {
	
	//Put your code to get data from Wily here	
	console.info('GetData from Wily Working');	
	//res.send("GetData Wily Working");


	function wily_callback(err, client) {
		
		if ( err ) { console.error("CreateClient Error : " + JSON.stringify(err));
                             //console.warn(Object(err).keys); 
                            return; 
                     }
 						
		client.setSecurity(new request.BasicAuthSecurity(_conf.wily_username,_conf.wily_password));
			
		try{
			
		client.getMetricData(args, function(err, result) { 
	
			   console.info("Using Web Services Wily Connector"); 
			   			   
			   if ( err ) console.error( "Call Error : " + JSON.stringify(err));
			   
			   else {  
                       var resp = result.getMetricDataReturn; //getMetricDataReturn; //getManagedModulesReturn; //getEMConfigReturn
                       var json = JSON.parse(JSON.stringify(resp.getMetricDataReturn.metricData));                                   
				       //console.raw( json.metricData.length);
				       //console.raw( json.metricData[3]);
					   
                   var metrics = [];
				   
                   for ( i = 0 ; i < json.metricData.length ; i++ ) {     

						var agentFields = json.metricData[i].agentName.$value.split('|'); 
						var metricFields = json.metricData[i].metricName.$value.split('|'); 

                        metrics.push( { id: json.metricData[i].attributes.id, 
										agent: json.metricData[i].agentName.$value, 
										server : agentFields[0], 
										platform : agentFields[1], 
										instance : agentFields[2], 
										metric: json.metricData[i].metricName.$value, 
										module : metricFields[0],
										appplication : metricFields[1],
										engine : metricFields[2],
										feature : metricFields[3],
										parameter : metricFields[4].split(' ').join(''), 
										value : json.metricData[i].metricValue.$value})
					}
					
					//console.raw( metrics);
				    //console.raw( metrics.length );
				    //console.raw( json.metricData.length);
			        //Utils.saveToFileXML('getMetricData',xml)
			        //Utils.saveToFileXML('getMetricDataJSON',JSON.stringify(metrics))
                                   					
					var Payload = require('./payload')
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
							
							var newInstanceTmp = p[0].split('/').join('_').split('~').join('_').split('.').join('_').split('-').join('_');
							var newInstance = (newInstanceTmp.substring(newInstanceTmp.lastIndexOf('_'))).split('_').join('');
							
							//console.log (newInstance);
							
							if ( parameters[_conf.wily_integration_namespace_ids[3] + newInstance ] ) {
								
							  parms = parameters[_conf.wily_integration_namespace_ids[3] + newInstance ];
							  //parms = parameters[_conf.wily_integration_namespace_ids[3] + metrics[i].module.split(' ').join('_').toUpperCase()];
							}
							
							if ( _conf.wily_integration_demo_mode ) { vals.push({ "t": stamp.getTime() / 1000, "v": Utils.randomInterval(0,150)}) }
							else {  vals.push({ "t": stamp.getTime() / 1000, "v": metrics[i].value }) }
																					
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
								 // "MetaTokenID" : metrics[i].server, // + "_" + metrics[i].id,
								 // "MetaFQDN" : metrics[i].software //+ "_" + metrics[i].instance
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
								 // "MetaTokenID" : metrics[i].server, // + "_" + metrics[i].id,
								 // "MetaFQDN" : metrics[i].software //+ "_" + metrics[i].instance
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
					
			   }
			   
			   
			   //res.send( result );
		  }); 
		}
		
		catch(err) {
    
	    console.warn(err); 
		console.error("Failed to retrieve data from Wily API"); 
	   }

			  
}

	var now = new Date();
    //var oneHourBefore = new Date(now);
    var oneMinuteBefore = new Date(now);
	//oneHourBefore.setHours(now.getHours() - 1);
	oneMinuteBefore.setMinutes(now.getMinutes() - 1);
	
	var agent, metric, start, end, freq;
	agent = '.*leaded.*';
	metric = '.*esales.*';	
	freq = 60;    	    
	//start = oneHourBefore.toISOString().split('.')[0]+"Z" ; //dateFormat(oneHourBefore, "yyyy-mm-ddHH:MM:ss");
	start = oneMinuteBefore.toISOString().split('.')[0]+"Z" ; //dateFormat(oneHourBefore, "yyyy-mm-ddHH:MM:ss");
	end = now.toISOString().split('.')[0]+"Z" ; //dateFormat(now, "yyyy-mm-ddHH:MM:ss"); //(now, "dd-mmm-yyyy - HH:MM:ss");
    
	if ( req.query ) {	
		if ( req.query.agent ) { agent = req.query.agent }
		if ( req.query.metric ) { metric = req.query.metric }
		if ( req.query.start ) { start = req.query.start }
		if ( req.query.end ) { end = req.query.end }
		if ( req.query.freq) { freq = req.query.freq }
	}

	var url = _conf.wily_host + ":" + _conf.wily_port + _conf.wily_api_context + _conf.wily_api_metrics_wsdl ;
	
    var args = {
   
	       agentRegex: agent,
	       metricRegex: metric,
	       startTime: start,
	       endTime: end,
	       dataFrequency: freq 
	}
		
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	var auth = "Basic " + new Buffer(_conf.wily_username + ":" + _conf.wily_password).toString("base64");
	
	var options = {
     
              // wsdl_options: { strictSSL: false, rejectUnauthorized: false  },
	             wsdl_headers: { Authorization: auth, Connection: 'Keep-Alive'}
	}
				
	
	console.log(url);
	console.log(_conf.wily_username + ":" + _conf.wily_password);
    console.log(auth)		
	console.log(JSON.stringify(options));
	console.log(JSON.stringify(args));
		
	try {
	
        request.createClient(url,  options, wily_callback );
	}
	catch(err) {console.error(err)}
	
	 if ( res ) res.send( { "code": 0, "message": "RUN_SUCCESS", "fields": "" } );
	  
};

