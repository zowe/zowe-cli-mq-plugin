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

import { TextUtils } from "@brightside/imperative";

export default {
    COMMAND: {
        DESCRIPTION: "MQ Utils",
        SUMMARY: "MQ Utility Functions",
        MQSC: {
            DESCRIPTION: "Runs an MQSC command against a Queue Manager",
            POSITIONALS: {
                THECOMMAND: "The MQ command",
                QUEUEMANAGER: "The queue manager to apply the command to",
                CSRF: "The cross site forgery field"
            },
            EXAMPLES: {
                EX1: `The following sequence shows how to create a new server-connection channel that is 
                    called NEWSVRCONN on a z/OS queue manager - our example queue manager is called MQ99`
            }
        }
    }
};
