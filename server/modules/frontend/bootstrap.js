// frontend.js

var os = require("os");
var fs = require('fs');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var _server = require('../../../conf/config.js'); 
var console = require('../../utils/logger.js');

//serverURL = os.hostname() + ":" + _server.engine_port;

module.exports = function(app){

try {
		//console.log(__dirname)
		fs.accessSync(__dirname + '/public', fs.F_OK);
		app.use(express.static(__dirname + '/public')); 
		app.use(favicon(path.join(__dirname,'public','app','img','favicon.ico')));
				
		app.use(function(req, res, next) {
			  res.header("Content-Type", "application/json");
			  res.header("Access-Control-Allow-Origin", "*");
			  res.header("Access-Control-Allow-Headers", "*");
			  next();
			});
	
	
		console.info('TrueSight Integration - Frontend is running on : ' + serverURL);
	
	}
	catch(err) {
		console.warn('TrueSight Integration - Could not load the Frontend on : ' + serverURL);
	}

	

}

