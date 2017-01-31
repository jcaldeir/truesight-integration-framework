//conf/config.js

module.exports = {
        
		//engine config variables
		engine_app_name: 'TrueSight Integration',
		engine_host: 'localhost',
		engine_port: '8090',
		engine_api_callback : '/api/callback',		
		engine_secure: false,
		engine_requireAuth: true,
		engine_username: 'admin',
		engine_password: 'admin',
		engine_load_integrations: true,
		engine_load_modules : true,
		keep_discovering : true,
		discovery_interval : '1000', //every X seconds
		debug_stdout: true,
		debug_file: true,
		debug_socket: true,
		
		
		//TrueSight Operations config variables
		truesight_operations_enabled : false,
		truesight_operations_name : 'TrueSight Operations',
		truesight_host : 'https://madtsapps10',
		truesight_port : '9443',
		truesight_api_context : '/bppm3pi-wsapi/v1/messaging',
		truesight_auth_context : '/service/endpoint',
		truesight_payload_context : '/payload',
		truesight_messaging_queue : 'tcp://madtsapps10:61616',
		truesight_send_queue : 'BPPM3PI.REST.SENDQ',
		truesight_reply_queue : 'BPPM3PI.REST.REPLYQ',
		truesight_username : 'admin',
		truesight_password : 'admin',
		truesight_refresh_token : '1', //every X minutes
		
		
		//TrueSight Inteligence config variables
		truesight_intelligence_enabled : false,
		truesight_intelligence_name : 'TrueSight Intelligence',
		truesight_intelligence_api : 'https://api.truesight.bmc.com',
		truesight_intelligence_username : '', 
		truesight_intelligence_token :  '', 
		
		
		//TrueSight Pulse config variables
		truesight_pulse_enabled : false,
		truesight_pulse_name : 'TrueSight Pulse',
		truesight_pulse_api : 'https://api.truesight.bmc.com',
		truesight_pulse_username : '', 
		truesight_pulse_token :  '' 
		
};
