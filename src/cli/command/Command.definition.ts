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

import { ICommandDefinition } from "@brightside/imperative";
import { MQSCCommandDefinition } from "./mqsc/MQSCCommand.definition";
import { MqSessionUtils } from "../MQSessionUtils";

import i18nTypings from "../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../-strings-/en").default as typeof i18nTypings).COMMAND;

const CommandDefinition: ICommandDefinition = {
    name: "run",
    summary: strings.SUMMARY,
    description: strings.DESCRIPTION,
    type: "group",
    children: [MQSCCommandDefinition],
    passOn: [
        {
            property: "options",
            value: MqSessionUtils.MQ_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [
                {type: "group"}
            ]
        }
    ]
};
export = CommandDefinition;
