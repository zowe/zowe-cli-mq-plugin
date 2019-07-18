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

import { ICommandDefinition } from "@zowe/imperative";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).COMMAND;

export const MQSCCommandDefinition: ICommandDefinition = {
    name: "mqsc",
    aliases: [],
    summary: strings.SUMMARY,
    description: strings.DESCRIPTION,
    type: "command",
    handler: __dirname + "/MQSCCommand.handler",
    positionals: [
        {
            name: "qmgr",
            description: strings.MQSC.POSITIONALS.QUEUEMANAGER,
            type: "string",
            required: true
        },
        {
            name: "cmd",
            description: strings.MQSC.POSITIONALS.THECOMMAND,
            type: "string",
            required: true
        }
    ],
    options: [],
    profile: {
        optional: ["mq"],
    },
    examples: [{
        description: strings.MQSC.EXAMPLES.EX1,
        options: "MQ99 \"DISPLAY CHANNEL(NEWSVRCONN)\""
    }]
};
