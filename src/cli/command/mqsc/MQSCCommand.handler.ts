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

import { AbstractSession, IHandlerParameters, IProfile } from "@brightside/imperative";
import MQSCCommand from "../../../api/MQSCCommand";
import { IMQResponse } from "../../../doc/IMQResponse";
import MqBaseHandler from "../../MQBaseHandler";

/**
 * Command handler for listing directory contents
 * @export
 * @class MQSCCommandHandler
 * @implements {ICommandHandler}
 */
export default class MQSCCommandHandler extends MqBaseHandler {
    /**
     * Process the list directory contents command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof MQSCCommandHandler
     */
    public async processWithSession(params: IHandlerParameters, session: AbstractSession, profile: IProfile ): Promise<IMQResponse> {
        try {
            let endCommand = params.arguments.cmd;
            if (( endCommand[0] === "'" && endCommand[endCommand.length - 1] === "'" )
                || ( endCommand[0] === "\"" && endCommand[endCommand.length - 1] === "\"" )) {
                endCommand = endCommand.substring(1,endCommand.length - 1);
            }
            return await MQSCCommand.qmgrAction(session, params.arguments.queuemgr, endCommand);
        } catch (except) {
            params.response.console.log("Exception thrown \n" +
                "Reason = " + except.message +
                "\nWe will continue on anyway.\n"
            );
        }
    }
}
