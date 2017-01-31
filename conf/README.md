# truesight-integration-framework
A JavaScript Framework to integrate third-party solutions with BMC TrueSight Operations, Intelligence and Pulse

## Purpose

- A configuration file to define initial settings for the framework engine

### Configure it

- A generic/global config file called config.js exists in root_folder/conf which contains the following parameters:

#### Engine parameters

|Parameter Name           |Description                                         |
|:------------------------|:---------------------------------------------------|		
|engine_app_name          ||
|engine_host              ||
|engine_port              ||
|engine_secure            ||
|engine_requireAuth       ||
|engine_username          ||
|engine_password          ||
|engine_load_integrations ||
|engine_load_modules      ||
|debug_stdout             ||
|debug_file               ||
|debug_socket             ||

#### TrueSight Operations parameters

|Parameter Name               |Description                                         |
|:----------------------------|:---------------------------------------------------|		
|truesight_operations_enabled |													   |
|truesight_operations_name    |													   |
|truesight_host               |													   |
|truesight_port               |													   |
|truesight_api_context        |													   |
|truesight_auth_context       |													   |
|truesight_payload_context    |													   |
|truesight_messaging_queue    |													   |
|truesight_send_queue         |													   |
|truesight_reply_queue        |													   |
|truesight_username           |													   |
|truesight_password           |													   |
|truesight_refresh_token      |													   |
		
		
#### TrueSight Intelligence parameters

|Parameter Name                   |Description                                         |
|:--------------------------------|:---------------------------------------------------|		
|truesight_intelligence_enabled   ||
|truesight_intelligence_name      ||
|truesight_intelligence_api       ||
|truesight_intelligence_username  ||
|truesight_intelligence_token     ||

		
#### TrueSight Pulse parameters

|Parameter Name            |Description                                         |
|:-------------------------|:---------------------------------------------------|		
|truesight_pulse_enabled   ||
|truesight_pulse_name      ||
|truesight_pulse_api       ||
|truesight_pulse_username  ||
|truesight_pulse_token     ||


### Credits
 - João Caldeira, joao_caldeira@bmc.com
 
 
### References

None
