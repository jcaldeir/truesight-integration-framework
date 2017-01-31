//wily/config.js
    module.exports = {
        		
		//Wily config variables
		integration_name : 'CA Wily',
		wily_integration_demo_mode : true,
		wily_integration_type: 'xml', //options are ws or xml. jdbc(in the future)
		wily_integration_namespace_ids : ['/BMC_INTEGRATION_WILY/WILY', '/BMC_INTEGRATION_APP_CONTAINER/APPLICATIONS','/BMC_INTEGRATION_WILY_APPLICATION/', '/BMC_INTEGRATION_WILY_TRANSACTION/'],
		wily_integration_namespace_labels : ['BMC', 'Wily Applications'],
		wily_host : 'https://malaga',
		wily_port : '6281',
		wily_username : 'WILYUSER',
		wily_password : 'ASsgCTn=ho$45^cG',
		wily_api_context : '/introscope-web-services/services/',
		wily_api_metrics_wsdl : 'MetricsDataService?wsdl',
		wily_api_events_wsdl : 'AlertPollingService?wsdl',
		collection_autostart : false, 
		collection_interval : '10', //every X seconds
				
};
