// modules.js

var console = require('./utils/logger.js');  
var Utils = require('./utils/utils.js')

module.exports = function(app){

	////Detect available modules
	////
		var modules = Utils.getIntegrations(__dirname + '/modules');
		
		for ( i = 0 ; i < modules.length ; i++ ) {    			
			
			var mod = modules[i];			
			
			var module = mod[0].toUpperCase() + mod.substring(1);
			console.info( module + ' module detected');
			
			try {
			
				require('./modules/' + mod + '/bootstrap.js')(app, mod) 
			
			}
			catch (error) { console.warn(error); console.error('Could not load ' + module + ' module' ); }
			
		}		
	////
	////Detect available modules
	

}

