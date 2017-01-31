# truesight-integration-framework
A JavaScript Framework to integrate third-party solutions with BMC TrueSight Operations, Intelligence and Pulse

## Supported OS

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    -    |  -   |

### Destination Platforms Supported (included)
 - TrueSight Operations
 - TrueSight Intelligence
 - TrueSight Pulse
 
### Source Platforms Supported (included)
 - CA Wily
 - Twitter search API

## Prerequisites
 
### Server Runtime

|  Runtime | node.js | Python | Java |
|:---------|:-------:|:------:|:----:|
| Required |    +    |        |      |


- Install NodeJS bundle for your platform - https://nodejs.org
- Make sure it is added to the path
- For Windows users run : npm install --global --production windows-build-tools


### Install the integration framework

- Download this software either in a zip file or clone this repository
- From the root/base folder of the software run: "npm install"


### Configure it

- A generic/global config file called config.js exists in root_folder/conf which contains the parameters to configure


### Run it

- From the root directory of the software run:
   - "npm start" to run an unsecure server (http)
   - "npm start secure" to run a secure server (https)

### Use it

- Open a browser and point to http://your_hostname:8090 or https://your_hostname:8090 if you run a secure server


### Credits
 - João Caldeira, joao_caldeira@bmc.com
 
 
### References

None
