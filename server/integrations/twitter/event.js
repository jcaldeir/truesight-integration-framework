//event.js
var _conf = require('./config.js');
var _utils = require('../../utils/utils.js');

module.exports = {
		
					"source":
									{
									"ref": _conf.source,
									"type": _conf.type,
									"name": _conf.source
									},
				    "sender":
									{
									"ref": _conf.source,
									"type": _conf.type,
									"name": _conf.source
									},
					"fingerprintFields": ["@title","uid"],
					"title": "",
					"eventClass": _conf.type,
					"status": "OPEN",
					"severity": "WARN",
					"createdAt": _utils.getEpoch(),
					"properties":
								{
									"uid": _utils.uuid(),
									"app_id": _conf.app_id,
									//"hostIp": "127.0.0.1",
									//"hostName": "sample.corp.com",
									//"thresholdValue": "0",
									//"entityId": "sample.corp.com",
									//"entityTypeId": "SAMPLE_DEVICE",
									//"entityAttrId": " idlecpupercentusage",
									//"entityAttrUnit": "%",
									//"entityAttrValue": "65.07"
								}
					
};
