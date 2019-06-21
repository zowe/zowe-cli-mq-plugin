# Zowe MQ CLI Help


Welcome to Zowe MQ CLI!

Zowe CLI is a command line interface (CLI) that provides a simple and streamlined way to  for z/OS.

For additional Zowe MQ CLI documentation, visit https://zowe.github.io/docs-site

For Zowe MQ CLI support, visit https://zowe.org

### Table of Contents
* [mq](#module-mq)
	* [run](#module-run)
		* [mqsc](#command-status)


# mq<a name="module-mq"></a>
Issue an MQ commands with output from the commands displayed on the local terminal.
## run<a name="module-run"></a>
MQ utility function.
### mqsc<a name="command-status"></a>
Issues an MQ command against a MQ Rest API server

#### Usage

#### zowe mq run mqsc [options]

   Positional Arguments

*    `queueManager`	(string)
        The Queue Manager for the MQSC command.
*    `commandText`	(string)
        The MQSC command to issue.


#### Options

*   `--response-format-json`  | `--rfj` *(boolean)*

	* Produce JSON formatted data from a command\.

*   `--help`  | `--h` *(boolean)*

	* Display help text\.

#### Profile Options

*   `--mq-profile`  | `--mq-p` *(string)*

	* The name of a (mq) profile to load for this command execution\.

### Examples

*  Dsiplay information about channel NEWSVRCONN on queue manager MQ99:

      * `$  zowe mq run mqsc MQ99 'DISPLAY CHANNEL(NEWSVRCONN) `

