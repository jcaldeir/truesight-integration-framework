//measurement.js
var _conf = require('./config.js');
var _utils = require('../../utils/utils.js');

module.exports = {
		
					"source": _conf.source,
					"metric": "",
					"measure": "",
					"timestamp": _utils.getEpoch(),
					"metadata": { "app_id": _conf.app_id }	  
					
};
