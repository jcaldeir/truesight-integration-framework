//utils/utils.js
var fs = require('fs');
var exports = module.exports = {};

function saveFile(filename,data,extension) {
   
   var file = fs.createWriteStream(__dirname + '/data/' + filename + '.' + extension, { flags : 'w'} );
   file.write(data);	 
   
}	

exports.uuid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


exports.getEpoch = function() {
  
  return (new Date().getTime() / 1000);
}


exports.random = function() {
  
  return Math.random();
}

exports.randomInterval = function(min,max) {
  
  return Math.floor(exports.random()*(max-min+1)+min);
}

exports.saveToFileJSON = function(filename,data) {
  
  saveFile(filename,data,'json');
  
}

exports.saveToFileXML = function(filename,data) {
  
  saveFile(filename,data,'xml');
  
}

exports.getIntegrations = function(srcpath) {
  
  var fs = require('fs'),
  path = require('path'); //.resolve(__dirname, file);
	
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
	 
}




