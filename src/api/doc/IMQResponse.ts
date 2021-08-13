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


interface ICommandResponses {
    /**
     * The command completion code.
     * @type{string}
     */
    completionCode: string;

    /**
     * The command reason code.
     * @type{string}
     */
    reasonCode: string;

    /**
     * The command response text.
     * @type{string[]}
     */
    text: string[];
}
/**
 * The IMQResponse API response.
 * @export
 */
export interface IMQResponse {

    /**
     * The command response text.
     * @type{string[]}
     */
    commandResponse: ICommandResponses[];

    /**
     * The completion code object.
     * @type{string}
     */
    overallCompletionCode: string;

    /**
     * The reaason code object.
     * @type{string}
     */
    overallReasonCode: string;
}
