// api.js

var decache = require('decache');

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4) 
var _console = require('../../utils/logger.js');  
var Engine = require('../../commands'); 


module.exports = function(app){
	
	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(morgan('dev')); //app.use(morgan('dev', {stream: accessLogStream}));
	app.use(methodOverride());

	//Generic API Routes
	//Test route to make sure everything is working 
	app.get('/api/', function(req, res) {
		res.json({ message: 'Hooray! Welcome to BMC TrueSight Integration API!' });   
	});
	
	app.post('/api/', function(req, res) {
		res.json({ message: 'Hooray! Welcome to BMC TrueSight Integration API!' });   
	});
	
	app.get('/api/list', function(req, res){  res.send(require('../../utils/document')(app._router.stack, 'express')); });
		
	  
	//Engine Routes
	
    // Just testing the Engine Routes
	app.get('/api/check', Engine.checkNode);
	
	// Execute Engine Login
    app.get('/api/login', Engine.login); 
    
	// Execute Engine Command - GET
    app.get('/api/engine/:component/:action', Engine.execute); 
	
	// Execute Engine Command - GET
    app.get('/api/engine/status', Engine.status); 
	
	// Execute Engine Command - GET
    app.get('/api/engine/integrations', Engine.integrations); 
    
    // Execute Engine Command - POST 
    app.post('/api/engine/:component/:action', Engine.execute); 


	decache('../../../conf/config.js');

}

