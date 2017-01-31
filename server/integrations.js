// integrations.js

var _server = require('../conf/config.js');
var console = require('./utils/logger.js');  
var Utils = require('./utils/utils.js')


module.exports = function(app) {

  function discovery()
   {
	////Detect available integrations
	////
	    console.info( "Running integration discovery..." );
		
		var folders = Utils.getIntegrations(__dirname + '/integrations');
		var integrations = [];
		
		//console.raw(folders);
		//console.raw(integrations_installed);
		
		for ( i = 0 ; i < folders.length ; i++ ) { 
		  
		  if ( ! integrations_installed.find(x => x.name === folders[i]) )  integrations.push( folders[i] )
		  
		}
		
		if ( integrations.length > 0  ) { 
		
		console.ok( 'Integrations were detected');
		
		//console.raw(integrations);
		//console.raw(integrations_installed);
		
		for ( i = 0 ; i < integrations.length ; i++ ) {    			
			
			var integ = integrations[i];			
			
			var integration = integ[0].toUpperCase() + integ.substring(1);
			console.info( integration + ' integration detected');
			
			try {
			
				require('./integrations/' + integ + '/bootstrap.js')(app, integration) 
			
			}
			catch (error) { console.warn(error); console.error('Could not load ' + integration + ' integration' ); }
			
		}		
	////
	////Detect available integrations
	socket.emit('integrations', integrations_installed );
   
   } else { console.warn( 'No more installable integrations were detected'); }
	
	if ( _server.keep_discovering ) setTimeout( discovery, _server.discovery_interval * 1000 );
	
   }
	
	////TrueSight Operations Integration
	////
		if ( _server.truesight_operations_enabled )	{
			console.info('TrueSight Integration - Operations Integration enabled... ' + 'Using API : ' + _server.truesight_host + ':' + _server.truesight_port );
		}
	////
	////TrueSight Operations Integration

	
	////TrueSight Intelligence Integration
	////
		if ( _server.truesight_intelligence_enabled )	{
			console.info('TrueSight Integration - Intelligence Integration enabled... ' + 'Using API : ' + _server.truesight_intelligence_api );
		}
	////
	////TrueSight Intelligence Integration
  
    ////TrueSight Pulse Integration
	////
		if ( _server.truesight_pulse_enabled )	{
			console.info('TrueSight Integration - Pulse Integration enabled... ' + 'Using API : ' + _server.truesight_intelligence_api );
		}
	////
	////TrueSight Pulse Integration
	
   discovery();
   
}

