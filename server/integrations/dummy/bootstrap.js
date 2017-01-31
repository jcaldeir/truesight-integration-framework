//twitter/bootstrap.js

var console = require('../../utils/logger.js');
var _conf;
var Integration;

var integration_name;
	
var exports = module.exports = function (app, integration) {

  _conf = require('./config.js'); 
  exports.running = _conf.collection_autostart;
    
  Integration = require('./' + integration.toLowerCase() + '.js');
    
  integration_name = integration;
  
  console.info('Loading ' + integration + ' integration');
  app.get('/api/' + integration.toLowerCase() + '/collection/getData', exports.getData);
  app.get('/api/' + integration.toLowerCase() + '/collection/start', exports.start);	
  app.get('/api/' + integration.toLowerCase() + '/collection/stop', exports.stop);
  app.get('/api/' + integration.toLowerCase() + '/collection/status', exports.status);
  app.put('/api/' + integration.toLowerCase() + '/callback', exports.callback);
    
  var component = { "name" : integration.toLowerCase(), "label" : _conf.integration_name, "theme": 'default', "icon" : "fa-gears", "situation": "Installed", "status" : "", "message": "" };

  if ( exports.running ) { component.status = "label-sucess"; component.message = "Running" } 
   else { component.status = "label-warning"; component.message = "Stopped" }
		
  integrations_installed.push ( component );
  
  Poll(); 
 
  console.ok( integration + ' integration loaded');
  
};


exports.start = function (req,res) {
	
		if ( !exports.running ) { exports.running = true;  console.ok( integration_name + " Collection Started\n");  }
		exports.status(req,res);

	}

exports.stop = function (req,res) {
	
		if ( exports.running ) { exports.running = false; console.warn( integration_name + " Collection Stopped\n");  }
		exports.status(req,res);

	}
	
exports.status = function (req,res) {
	
	_conf = require('./config.js'); 
	
	if ( exports.running ) { 
	        integrations_installed.find(x => x.name === integration_name.toLowerCase()).status = "label-success"; 
			integrations_installed.find(x => x.name === integration_name.toLowerCase()).message = "Running";
	   }
		else { 
		       integrations_installed.find(x => x.name === integration_name.toLowerCase()).status = "label-warning"; 
			   integrations_installed.find(x => x.name === integration_name.toLowerCase()).message = "Stopped";
			  }
				
	res.send( integrations_installed.find(x => x.name === integration_name.toLowerCase()) );
    
	}

exports.callback = function (req,res) {
			
		console.info(integration_name + " Callback called\n");
		console.raw(req.body);
		res.json({ message: 'Hooray! ' + integration_name + 'callback function called!' });
		
	}

exports.collect = function(req,res) {
	
	exports.getData(req,res);
		
}

	
exports.getData = function(req,res) {
    
	Integration.getData(req,res);
	
}

function Poll()	{
	
				if ( exports.running ) {  exports.collect();  } //This is the place to put functions to start collecting data
				else { console.heartbeat();	 }	
				setTimeout( Poll, _conf.collection_interval * 1000 );	
}
		

