//soap.js

var console = require('../utils/logger.js');
var _conf = require('../../conf/config.js');
var soap = require('soap');
var args, response;
	
var exports = module.exports = {};


function willy_callback(err, client) {
		
	client.NumberToWords (args, function(err, result) {
   
           //console.log (result);

		   if ( err ) console.log(err);
		   
		   response.send( result );
		   response = null;
      }); 
	  	  
}

function cities_callback(err, client) {
		
	  var parser = require('xml2json');
	  
	  client.GetCitiesByCountry (args, function(err, result) {
 
			var xml = result.GetCitiesByCountryResult;
			console.log(xml);
			
			console.log("### XML Input ### \n %s", xml)
			console.log("### XML Input ### \n")
			 
			// xml to json 
			var json = parser.toJson(xml);
			console.log("\n### JSON Output ### \n %s", json);
			console.log("### JSON Output ### \n");

		   if ( err ) console.log(err);
		   
		   response.send(json)
		   response = null;
		   
      });
	  	  
}

function weather_callback(err, client) {
		        
	  client.GetWeather (args, function(err, result) {
   
            console.log (result);

		   if ( err ) console.log(err);
		   
		   response.send(result)
		   response = null;
      });
	  	  
}


exports.willy = function(req,res) {

    var url = _conf.willy_wsdl ;
    args = {ubiNum: req.params.number};
	response = res;
	
    soap.createClient(url, willy_callback );
      
};

exports.cities = function(req,res) {

    var url = 'http://www.webservicex.com/globalweather.asmx?wsdl' ;
    args = {CountryName: 'Portugal'};
	response = res;
	
    soap.createClient(url, cities_callback );
      
};

exports.weather = function(req,res) {

    var url = 'http://www.webservicex.com/globalweather.asmx?wsdl' ;
    args = {CityName: 'Lisboa / Portela', CountryName: 'Portugal'};
	response = res;
	
    soap.createClient(url, weather_callback );
      
};
