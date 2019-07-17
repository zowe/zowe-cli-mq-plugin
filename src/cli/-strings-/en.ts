/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

export default {
    COMMAND: {
        DESCRIPTION: "MQ Utilities",
        SUMMARY: " Run an IBM MQ script command for queue manager configuration",
        MQSC: {
            DESCRIPTION: "Runs an MQSC script command against a Queue Manager for configuration ",
            POSITIONALS: {
                THECOMMAND: "The MQSC command",
                QUEUEMANAGER: "The queue manager to apply the command to",
                CSRF: "The cross site forgery field"
            },
            EXAMPLES: {
                EX1: `The following sequence shows how to query a server-connection channel that is ` +
                   `called NEWSVRCONN on an MQ queue manager - our example queue manager is called MQ99`
            }
        }
    }
};
