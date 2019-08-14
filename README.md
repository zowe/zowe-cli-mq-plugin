# IBM MQ Plug-in for Zowe CLI

[![codecov](https://codecov.io/gh/zowe/zowe-cli-ims-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/zowe/zowe-cli-mq-plugin)

This repository contains a IBM MQ Plug-in for Zowe CLI lets you issue MQSC commands to a queue manager. MQSC commands let you perform administration tasks, such as defining, altering, and deleting local queue objects. For more infornation MQSC commands and syntax, see [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.ref.adm.doc/q085130_.htm).

## Contributing to this plug-in 
For information about contributing to the plug-in, see the Zowe CLI [contribution guidelines](CONTRIBUTING.md), which contains standards and conventions for developing plug-ins for Zowe CLI.

The guidelines contain critical information about working with the code, running, writing, maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates properly with Zowe CLI.

## Prerequisites
Before you install the plug-in, complete the following prerequisites:
* Install Zowe CLI on your PC.
   **Note:** For more information, see [Installing Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

* Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.sce.doc/q121910_.htm) or later is installed and running in your mainframe environment.

* Zowe installation with MQ. For more insformation, see [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/)

## Understanding how the plug-in works
- The plug-in defines an MQ profile to manage the connection information that is required to access the MQ API.
- It implements a local API to interface with the relevant API on the server.
- The plug-in creates a wrapping CLI around the local API to provide the command line function.

## Installing the plug-in

Use one of the following methods to install the plug-in:

-   Install the plug-in from an online registry or a local package.

    Use this method when you simply want to install the plug-in to Zowe CLI and start using it. For more information, see [Installing plug-ins](https://zowe.github.io/docs-site/latest/user-guide/cli-installplugins.html) on the [Zowe Docs](https://zowe.github.io/docs-site/latest/) website.

-   Build the plug-in from source and install it into your Zowe CLI implementation.

    Use this method when you want to install tha plug-in to Zowe CLI using the most current binaries and modify the behavior of the plug-in. For example, you want to create a new command and use the plug-in with the command that you created. For more information, see [Building the plug-in from source](#building-the-plug-in-from-source).

## Building the plug-in from source

**Follow these steps:**
1. The first time that you clone the IBM MQ Plug-in for Zowe CLI from the GitHub repository, issue the following command against the local directory:

    ```
    npm install
    ```
    The command installs the required IBM MQ Plug-in for Zowe CLI dependencies and several development tools. When necessary, you can run the task at any time to update the tools.

2. To build your code changes, issue the following command:

    ```
    npm run build
    ```

    The first time you build your code changes, you will be prompted for the location of the Imperative CLI Framework package, which is located in the `node_modules/@zowe` folder in the directory where Zowe CLI was installed.

    **Note:** When you update `package.json` to include new dependencies, or when you pull changes that affect `package.json`, issue the `npm update` command to download the dependencies.

3. Issue one of the following commands to install the plug-in:

    ```
    zowe plugins install <local path your cloned repo>
    ```

    Or:

    ```
    zowe plugins install .
    ```

## Validate the plug-in

The validation process helps to ensure the following conditions:
The installation process completed successfully.
The plug-in does ***not*** contain commands, options, and arguement that conflict (possess the same names) as the other plug-ins that are installed in your Zowe CLI installation.

**Note:** This is an optional task.

**Follow these steps:**

1. Issue the following command:
    ```
    zowe plugins validate @zowe/mq-for-zowe-cli
    ```
    When you install the plug-in successfully, the following message displays:
    ```
    Validation results for plugin 'mq':
    Successfully validated.
    ``` 
    **Tip:** When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the directory where you installed Zowe CLI.  

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
The IBM MQ Plug-in for Zowe CLI uses three sets of tests; unit, integration and system.

Before running the integration and system tests it is necessary to have a server connection to run against as described in the [Prerequisites](#prerequisites) section.

Access credentials to this server is defined by copying the __tests__/__resources__/properties/example_properties.yaml file to create a new file __tests__/__resources__/properties/custom_properties.yaml
Instructions of how to update your new custom_properties.yaml are provided in the file itself.

 To run the unit tests simply type in the following:
1. `npm run test:unit`
2. `npm run test:integration`
3. `npm run test:system`

Any failures potentially indicate an issue with the set-up of the Rest API or configuration parameters passed in the custom_properties.yaml file

## Uninstall the plug-in

**Follow these steps:**
1.  To uninstall the plug-in from a base application, issue the following command:
    ```
    zowe plugins uninstall @zowe/mq-for-zowe-cli
    ```
After the uninstallation process completes successfully, the product no longer contains the plug-in. 


### Tutorials
To learn about how to work with this sample plug-in, build new commands, or build a new plug-in for Zowe CLI, see [Develop for Zowe CLI](https://zowe.github.io/docs-site/latest/extend/extend-cli/cli-devTutorials.html).

### Imperative CLI Framework Documentation
[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to these documents during development. 


