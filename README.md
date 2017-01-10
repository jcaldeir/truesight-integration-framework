# truesight-integration-framework
Integration framework for third-party solutions to TrueSight Operations, Intelligence and Pulse

#### Supported OS

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    -    |  -   |

### Destination Platforms Supported (included)
 - TrueSight Operations
 - TrueSight Intelligence
 - TrueSight Pulse
 
### Source Platforms Supported(included)
 - CA Wily
 - Twitter search API

### Prerequisites
 
#### Server Runtime

|  Runtime | node.js | Python | Java |
|:---------|:-------:|:------:|:----:|
| Required |    +    |        |      |

- Install NodeJs bundle for your platform - https://nodejs.org


### Install the integration framework

- Download this software either in a zip file or clone this repository
- From the root directory of the software run: "npm install"


### Configure it

- A generic/global config file called config.js exists in root_folder/config which contains the following parameters:

|Parameter Name   |Description                                         |
|:----------------|:---------------------------------------------------|
|Source           |Meter collecting metrics from the Streaming Platform|
|PollInterval     |How often to send measurements in seconds           |
|Host             |Hostname/IP of the Streaming Platform API server    |
|Port             |Port of the Streaming Platform API server           |


### Run it

- From the root directory of the software run:
   - "npm start" to run an unsecure server (http)
   - "npm start secure" to run a secure server (https)

### Use it

- Open a browser and point to http://your_hostname:8095 or https://your_hostname:8095 if you run a secure server


### Credits
 - João Caldeira, joao_caldeira@bmc.com
                                        |

### References

None
