# Zowe MQ Plug-in

[![codecov](https://codecov.io/gh/zowe/zowe-cli-ims-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/zowe/zowe-cli-ims-plugin)

This repository contains a Zowe CLI plug-in for MQ that enables users to issue MQSC commands to a queue manager. 
MQSC commands enable you to perform administration tasks. For example, you can define, alter, or delete a local queue object. MQSC commands and their syntax are described in [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.ref.adm.doc/q085130_.htm) 

## Contributing to this plugin 
Please refer to the Zowe CLI [contribution guidelines](CONTRIBUTING.md) which contain standards and conventions for developing Zowe CLI plug-ins. 

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

### Prerequisites
Before you install the plug-in, the following prerequisites need to be met:
* Install Zowe CLI on your PC.
   **Note:** For more information, see [Installing Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

* Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.sce.doc/q121910_.htm) or later is installed and running in your mainframe environment.

* Zowe installation with MQ. Please read this blog for more information: [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/)

## Structure of the MQ Plug-in
- This plugin defines an MQ profile to manage the connection information required to access the MQ API
- Implements a local API to interface with the relevant API on the server
- Creates a wrapping CLI around the local API to provide the command line function

## Build the Plug-in from Source
**Follow these steps:**
1. The first time that you clone the Zowe CLI plug-in for MQ from the GitHub repository, issue the following command against the local directory:

    ```
    npm install
    ```
    The command installs the required Zowe CLI Plug-in for MQ dependencies and several development tools. When necessary, you can run the task at any time to update the tools.

2. To build your code changes, issue the following command:

    ```
    npm run build
    ```

    The first time you build your code changes, you will be prompted for the location of the Imperative CLI Framework package, which is located in the `node_modules/@zowe` folder in the directory where Zowe CLI was installed.

    **Note:** When you update `package.json` to include new dependencies, or when you pull changes that affect `package.json`, issue the `npm update` command to download the dependencies.

## Install the Zowe CLI Plug-in for MQ

**Follow these steps:**

1.  [Meet the prerequisites](#prerequisites).

2.  Install the plug-in:
    ```
    zowe plugins install @zowe/mq@latest
    ``` 
    
    **Note**: The `latest` npm tag installs a version of the product that is intended for public consumption. You can use different npm tags to install other versions of the product. For example, you can install with the `@beta` tag to try new features that have not been fully validated. For more information about tag usage, see [NPM Tag Names](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md#npm-tag-names).
    
3.  (Optional) Verify the installation:
    ```
    zowe plugins validate @zowe/mq
    ```
    When you install the plug-in successfully, the following message displays:
    ```
    Validation results for plugin 'mq':
    Successfully validated.
    ``` 
    **Tip:** When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the directory where you installed Zowe CLI.  

4.  [Create a user profile](#create-a-user-profile).

## Create a User Profile
You can create an `mq` user profile to avoid typing your connection details on every command. An `mq` profile contains the host, port, username, and password for the MQ Rest API server of your choice. You can create multiple profiles and switch between them as needed.

**Follow these steps:**
1.  Create an `mq` profile: 
    ```
    zowe profiles create mq-profile <profileName> --host <hostname> --port <portnumber> --user <username> --password <password> --rejectUnauthorized false

    ```
    The result of the command displays as a success or failure message. You can use your profile when you issue commands in the mq command group.

**Tip:** For more information about the syntax, actions, and options, for a profiles create command, open Zowe CLI and issue the following command:

```
zowe profiles create mq-profile -h
```

## Run Tests
The Zowe CLI plug-in for MQ plugin uses three sets of tests; unit, integration and system.

Before running the integration and system tests it is necessary to have a server connection to run against as described in the [Prerequisites](#prerequisites) section.

Access credentials to this server is defined by copying the __tests__/__resources__/properties/example_properties.yaml file to create a new file __tests__/__resources__/properties/custom_properties.yaml
Instructions of how to update your new custom_properties.yaml are provided in the file itself.

 To run the unit tests simply type in the following:
1. npm run test:unit
2. npm run test:integration
3. npm run test:system

Any failures potentially indicate an issue with the set-up of the Rest API or configuration parameters passed in the custom_properties.yaml file

## Uninstall the Plug-in

**Follow these steps:**
1.  To uninstall the plug-in from a base application, issue the following command:
    ```
    zowe plugins uninstall @zowe/mq
    ```
After the uninstallation process completes successfully, the product no longer contains the plug-in. 


### Tutorials
To learn about how to work with this sample plug-in, build new commands, or build a new Zowe CLI plug-in, see [Develop for Zowe CLI](https://zowe.github.io/docs-site/latest/extend/extend-cli/cli-devTutorials.html).

### Imperative CLI Framework Documentation
[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to these documents during development. 


