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

import { IMessageDefinition } from "@zowe/imperative";

/**
 * Messages to be used as command responses for different scenarios
 * @type {object.<string, IMessageDefinition>}
 * @memberOf MQMessages
 */
export const MQMessages: { [key: string]: IMessageDefinition } = {
    /**
     * Message indicating that the Queue manager name is not specified
     * @type {IMessageDefinition}
     */
    missingQueueManagerName: {
        message: "Missing Queue manager name."
    },

    /**
     * Message indicating that the Queue manager action command is not specified
     * @type {IMessageDefinition}
     */
    missingCommand: {
        message: "Missing action command."
    },
};

