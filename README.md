# IBM® MQ Plug-in for Zowe CLI  <!-- omit in toc -->

[![codecov](https://codecov.io/gh/zowe/zowe-cli-ims-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/zowe/zowe-cli-mq-plugin)

The IBM MQ Plug-in for Zowe CLI lets you issue MQSC commands to a queue manager. With MQSC commands, you can perform administration tasks, such as defining, altering, and deleting local queue objects. For information MQSC commands and syntax, see [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.ref.adm.doc/q085130_.htm).

- [How the plug-in works](#how-the-plug-in-works)
- [Software requirements](#software-requirements)
- [Installing](#installing)
- [Building from source](#building-from-source)
- [Creating a user profile](#creating-a-user-profile)
- [Running tests](#running-tests)
- [Uninstalling](#uninstalling)
- [Contributing](#contributing)

## How the plug-in works

- The plug-in defines an MQ profile to manage the connection information, which is required to access the MQ API.
- It implements a local API to interface with the relevant API on the server.
- The plug-in creates a wrapping CLI around the local API to provide the command-line function.

## Software requirements

Before you install and use the plug-in:

<!-- TODO When @latest branch of Zowe docs-site exists, we should give users the option to go and read about/install the @latest or the @lts-incremental versions of this plug-in. We can also explain which branches in the repo correspond to which CLI version. -->

-   Install Zowe CLI on your computer.

    **Note:** For more information, see [Installing Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

-   Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.sce.doc/q121910_.htm) or later is installed and running in your mainframe environment.

-   Expose the MQ API the API Mediation Layer (API ML), or, connect the plug-in directly to the MQ API. For more information, see [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/) and [Configuring the mqweb server](https://www.ibm.com/support/knowledgecenter/SSFKSJ_9.1.0/com.ibm.mq.con.doc/q019098_.htm).

## Installing

Use one of the following methods to install the plug-in:

-   Install the plug-in from an online registry or a local package.

    Use the online registry/local package method when you simply want to install the plug-in to Zowe CLI and start using it.

    For more information, see [Installing plug-ins](https://zowe.github.io/docs-site/latest/user-guide/cli-installplugins.html) on the [Zowe Docs](https://zowe.github.io/docs-site/latest/) website.

-   Build the plug-in from source and install it into your Zowe CLI implementation.

    Use the build from source method when you want to install the plug-in to Zowe CLI using the most current binaries and modify the behavior of the plug-in. For example, you want to create a new command and use the plug-in with the command that you created.

    For more information, see [Building from source](#building-from-source).

## Building from source

**Follow these steps:**

1.  The first time that you clone the IBM MQ Plug-in for Zowe CLI from the GitHub repository, issue the following command against the local directory:

    ```
    npm install
    ```
    The command installs the required dependencies and several development tools. You can run the task at any time to update the tools as needed.

2.  To build your code changes, issue the following command:

    ```
    npm run build
    ```

    The first time you build your code changes, you will be prompted for the location of the Imperative CLI Framework package, which is located in the `node_modules/@zowe` folder in the Zowe CLI home directory.

    **Note:** When you update `package.json` to include new dependencies, or when you pull changes that affect `package.json`, issue the `npm update` command to download the dependencies.

3.  Issue one of the following commands to install the plug-in:

    ```
    zowe plugins install <local path your cloned repo>
    ```

    Or:

    ```
    zowe plugins install .
    ```

**Tip:** After the installation process completes, it validates that the plug-in was installed correct and the names of its commands, options, and arguments do not conflict with that of the other plug-ins that you installed into your Zowe CLI implementation.

When the validation process is successful, the following message displays:

```
Validation results for plugin 'mq':
Successfully validated.
```

When an unsuccessful message displays, you can troubleshoot the installation by addressing the issues that the message describes. You can also review the information that is contained in the log file that is located in the Zowe CLI home directory.

## Creating a user profile
You can create an `mq` user profile to avoid typing your connection details on every command. An `mq` profile contains the host, port, username, and password for the MQ Rest API server of your choice. You can create multiple profiles and switch between them as needed.

**Follow these steps:**

1.  Create an `mq` profile:
    ```
    zowe profiles create mq-profile <profileName> --host <hostname> --port <portnumber> --user <username> --password <password> --rejectUnauthorized false
    ```
    The result of the command displays as a success or failure message. You can use the profile when you issue commands in the mq command group.

**Tip:** For more information about the syntax, actions, and options, for a profiles create command, open Zowe CLI and issue the following command:

```
zowe profiles create mq-profile -h
```


## Creating a user profile

After you install the plug-in, you create an MQ profile. An MQ profile is recommended to issue commands to the MQ resource. MQ profiles contain your host, port, user name, and password for the IBM MQ REST API server of your choice. You can create multiple profiles and switch between them as needed.

**Follow these steps:**
1.  Install the IBM MQ Plug-in for Zowe CLI
2.  Create an MQ profile:

    ```
    zowe config init
    ```
3.  Set the port number to your MQ port:

    ```
    zowe config set profiles.mq.properties.port <port number>
    ```

## Running tests

You can perform the following types of tests on the IBM MQ plug-in:
- Unit
- Integration
- System

**Note:** For detailed information about conventions and best practices for running tests against Zowe CLI plug-ins, see [Zowe CLI Plug-in Testing Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md).

Before running the system and integration tests, you must have a server connection to run against. For more information, see [Software requirements](#software-requirements).

To define access credentials to the server, copy the file named `.../__tests__/__resources__/properties/example_properties.yaml` and create a file named `.../__tests__/__resources__/properties/custom_properties.yaml`.

**Note:** Information about how to customize the `custom_properties.yaml` file is provided in the yaml file itself.

Issue the following commands to run the tests:
1. `npm run test:unit`
2. `npm run test:integration`
3. `npm run test:system`

Any failures potentially indicate an issue with the set-up of the Rest API or configuration parameters that were passed in the `custom_properties.yaml` file.

## Uninstalling

**Follow these steps:**

1.  Issue the following command:

    ```
    zowe plugins uninstall @zowe/mq-for-zowe-cli
    ```

After the uninstallation process completes successfully, the product no longer contains the plug-in.

## Contributing

For information about contributing to the plug-in, see the Zowe CLI [Contribution Guidelines](CONTRIBUTING.md). The guidelines contain standards and conventions for developing plug-ins for Zowe CLI. This includes information about running, writing, maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates properly with Zowe CLI.

### Tutorials

To learn about building new commands or a new plug-in for Zowe CLI, see [Develop for Zowe CLI](https://zowe.github.io/docs-site/latest/extend/extend-cli/cli-devTutorials.html).

### Imperative CLI Framework documentation

[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to the documentation as you develop your plug-in.