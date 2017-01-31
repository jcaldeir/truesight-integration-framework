// routes.js

var decache = require('decache');

//var _conf = require('../conf/config.js');
var console = require('./utils/logger.js');  

var Engine = require('./commands'); 
//var Wily = require('./ws/wily_' + _conf.wily_integration_type);
//var running = false;

module.exports = function(app){
	
	//Generic API Routes
	//Test route to make sure everything is working (accessed at GET http://localhost:8090/api)
	app.get('/api/', function(req, res) {
		res.json({ message: 'Hooray! Welcome to BMC TrueSight Integration API!' });   
	});
	
	app.post('/api/', function(req, res) {
		res.json({ message: 'Hooray! Welcome to BMC TrueSight Integration API!' });   
	});
	
	app.get('/api/list', function(req, res){  res.send(require('./utils/document')(app._router.stack, 'express')); });
		

  
	//Engine Routes
	
    // Just testing the Engine Routes
	app.get('/api/check', Engine.checkNode);
	
	// Execute Engine Login
    app.get('/api/login', Engine.login); 
    
	// Execute Engine Command - GET
    app.get('/api/engine/:component/:action', Engine.execute); 
	
	// Execute Engine Command - GET
    app.get('/api/engine/status', Engine.status); 
    
    // Execute Engine Command - POST 
    app.post('/api/engine/:component/:action', Engine.execute); 

	
	//decache('./ws/wily_' + _conf.wily_integration_type);
	decache('../conf/config.js');

}

