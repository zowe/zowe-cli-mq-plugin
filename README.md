# Zowe MQ Plug-in
This repository contains a Zowe CLI plug-in for MQ that enables users to issue MQSC commands to a queue manager. 
MQSC commands enable you to perform administration tasks. For example, you can define, alter, or delete a local queue object. MQSC commands and their syntax are described in [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.0.0/com.ibm.mq.ref.adm.doc/q085130_.htm) 

### Prerequisites
1. Zowe installation with MQ. Please read this blog for more information: [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/)
2. Zowe CLI installed locally. Before installing the Zowe CLI plug-in, [install Zowe CLI globally.](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html)

## Structure of the MQ Plug-in
- This plugin defines an MQ profile to manage the connection information required to access the MQ API
- Implements a local API to interface with the relevant API on the server
- Creates a wrapping CLI around the local API to provide the command line function

### Using the command
The CLI Command structure is explicit and requires a group, object and method so the command appears as ***zowe mq run mqsc MQ66 "DISPLAY CHANNEL (SYSTEM.DEF.C*) ALL"**. For further information regrading Zowe CLI commands and to create the profile please refer to [Using Zowe MQ CLI plugin](docs/MQReadme.md)

## Contributing to this plugin 
Please refer to the Zowe CLI [contribution guidelines](CONTRIBUTING.md) which contain standards and conventions for developing Zowe CLI plug-ins. 

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

### Imperative CLI Framework Documentation
[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to these documents during development. 


