//logger.js

var fs = require('fs');
var util = require('util');
var decache = require('decache');
var dateFormat = require('dateformat');
var log_stdout = process.stdout;
var colors = require('colors/safe'); // does not alter string prototype
var _conf = require('../../conf/config.js');
var log_file = fs.createWriteStream(__dirname + '/../../logs/console.log', {flags : 'a'});
	
var exports = module.exports = { };

		var protocol = 'http';
		if (_conf.engine_secure) protocol = protocol + 's';
		
        socket = require('socket.io-client')(protocol + '://' + 'localhost' + ':' + _conf.engine_port)
		
		//socket = io.connect('localhost', {
	    //		port: 8090
	    //	});
		
		socket.on('connect', function () { //console.info("\nSocket in Logger connected");  console.info(serverURL);
										});
		socket.on('event', function(data){ console.info("Data Received ", data); });
		socket.on('disconnect', function(){ console.info("\nSocket no longer connected");});
		

function addTimestamp() {

  var now = new Date();	
  var time = dateFormat(now, "yyyy-mm-dd - HH:MM:ss"); //(now, "dd-mmm-yyyy - HH:MM:ss");
  var log = time; // + d; //util.format(d) ; 
  return log;
  
};

function sinkToStdout(d) {

  var _conf = require('../../conf/config.js');
 
   //print all levels of objetcs ----   console.log(util.inspect(result, false, null))
 
  if ( _conf.debug_stdout ) { log_stdout.write( d ); }

  decache('../../conf/config.js');
};

function sinkToFile(d) {

  var _conf = require('../../conf/config.js');
	
	  if ( _conf.debug_file ) { 			
			log_file.write( d ); 
			//log_file.close();
		}

  decache('../../conf/config.js');
  
};

function sinkToLog(d, mode, alive) {

    var _conf = require('../../conf/config.js');
  
	var time = addTimestamp();
    var message =  "\r\n[ " + time + " ] :: " + d;
	var heartbeat = "\r\n[ " + time + " ] :: " + ("Heartbeat started ...");
		
		if (mode == 'log') sinkToStdout(message);
		if (mode == 'success') sinkToStdout(colors.white.bgGreen(message));
		if (mode == 'info') sinkToStdout(colors.white.bgBlue(message));
		if (mode == 'warning') sinkToStdout(colors.yellow(message));
		if (mode == 'danger') sinkToStdout(colors.white.bgRed(message));
	
	if ( alive ) sinkToStdout(colors.green(heartbeat));
	sinkToFile(message);
	if ( alive ) sinkToFile(heartbeat);
	
	  		
	if ( _conf.debug_socket ) socket.emit('event', {timestamp: time, message: d, severity: mode} );

  
};


exports.log = function(d) {

	sinkToLog(d,'log', false);
  
};


exports.error = function(d) {

	sinkToLog(d,'danger', true)
   
};

exports.warn = function(d) {

	sinkToLog(d,'warning', false)
   
};


exports.info = function(d) {

	 sinkToLog(d,'info', false)
	 
};


exports.ok = function(d) {

    
	sinkToLog(d,'success', false)
   
};


exports.ok = function(d,hb) {

    
	sinkToLog(d,'success', hb)
   
};

exports.heartbeat = function() {

  var heartbeat = " @";
  sinkToStdout(colors.green(heartbeat));
  sinkToFile(heartbeat);
  
}

exports.raw = function(result) {
	
inspect = require('eyes').inspector({maxLength: false}) 
inspect(result)

}

