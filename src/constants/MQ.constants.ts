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

/**
 * Constants to be used by the API
 * @memberOf MQConstants
 */
export const MQConstants: { [key: string]: any } = {
    /**
     * Specifies the z/OS data set and file REST interface
     * @type {string}
     */
    RESOURCE: "/ibmmq/rest/v1",

    /**
     * Indicator of a queue manager channel request
     * @type {string}
     */
    RES_QUEUE_MANAGER: "/admin/qmgr",

    /**
     * Indicator of a queue manager channel action
     * @type {string}
     */
    RES_QUEUE_MANAGER_COMMAND: "/admin/action/qmgr",

    /**
     * Indicator of a channel request
     * @type {string}
     */
    RES_CHANNEL: "/channel",

    /**
     * Indicator of a queue manager action request
     * @type {string}
     */
    RES_QUEUE_MANAGER_ACTION: "/mqsc",
};
