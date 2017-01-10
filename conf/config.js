//conf/config.js

module.exports = {
        
		//engine config variables
		engine_app_name: 'TrueSight Integration',
		engine_host: 'flute.aramco.com',
		engine_port: '8090',
		engine_api_callback : '/api/wily/callback',		
		engine_secure: false,
		engine_requireAuth: true,
		engine_username: 'admin',
		engine_password: 'admin',
		engine_load_integrations: true,
		engine_load_modules: true,
		debug_stdout: true,
		debug_file: true,
		debug_socket: true,
		
		
		//TrueSight Operations config variables
		truesight_operations_enabled : true,
		truesight_operations_name : 'TrueSight Operations',
		//truesight_host : 'https://flute.aramco.com',
		truesight_host : 'https://madtsapps10',
		truesight_port : '9443',
		truesight_api_context : '/bppm3pi-wsapi/v1/messaging',
		truesight_auth_context : '/service/endpoint',
		truesight_payload_context : '/payload',
		//truesight_messaging_queue : 'tcp://flute.aramco.com:61616',
		truesight_messaging_queue : 'tcp://madtsapps10:61616', //'tcp://172.21.122.43:61616'
		truesight_send_queue : 'BPPM3PI.REST.SENDQ',
		truesight_reply_queue : 'BPPM3PI.REST.REPLYQ',
		truesight_username : 'admin',
		truesight_password : 'admin',
		truesight_refresh_token : '1', //every X minutes
		
		
		//TrueSight Inteligence config variables
		truesight_intelligence_enabled : true,
		truesight_intelligence_name : 'TrueSight Intelligence',
		truesight_intelligence_api : 'https://api.truesight.bmc.com',
		truesight_intelligence_username : 'joao_caldeira@bmc.com', //'philippe_peter@bmc.com',
		truesight_intelligence_token :  'a1c31f0f-ae5f-46e9-8fce-19b7f39bc1a7', //'40e22f9f-e0f3-416b-aca7-97bbbbca0e04'
		
		//TrueSight Pulse config variables
		truesight_pulse_enabled : true,
		truesight_pulse_name : 'TrueSight Pulse',
		truesight_pulse_api : 'https://api.truesight.bmc.com',
		truesight_pulse_username : 'joao_caldeira@bmc.com', //'philippe_peter@bmc.com',
		truesight_pulse_token :  'a1c31f0f-ae5f-46e9-8fce-19b7f39bc1a7' //'40e22f9f-e0f3-416b-aca7-97bbbbca0e04'
		
};
