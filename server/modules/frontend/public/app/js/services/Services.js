/**
 * New node file
 */


var usr = '';
var pwd = '';
var home_url = location.protocol + '//' + location.hostname + ':' + location.port;
var appContext = '/api';
var base_url = home_url + appContext; 


var Services = angular.module('Services', ['ngResource']);

KitServices.factory('Parameters', ['$resource', function($resource){
			
    	return $resource( base_url + '/parameters', { }, 
    		{
    			//query: { method: 'JSONP', params: { callback: 'JSON_CALLBACK' } }
    			//query:  { method:'GET', params:{}, isArray:true }
    			//update: { method:'POST', params:{ } }
    		
    });
      
  }]);
