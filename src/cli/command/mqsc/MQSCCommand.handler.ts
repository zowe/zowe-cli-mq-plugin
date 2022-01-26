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

import { IHandlerParameters, IProfile, Session } from "@zowe/imperative";
import MQSCCommand from "../../../api/MQSCCommand";
import { IMQResponse } from "../../../api/doc/IMQResponse";
import MqBaseHandler from "../../MQBaseHandler";

/**
 * Command handler for MQSC script commands
 * @export
 * @class MQSCCommandHandler
 * @implements {ICommandHandler}
 */
export default class MQSCCommandHandler extends MqBaseHandler {
    /**
     * Process the MQSC script command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof MQSCCommandHandler
     */
    public async processWithSession(params: IHandlerParameters, session: Session, profile: IProfile ): Promise<IMQResponse> {
        return MQSCCommand.qmgrAction(session, params.arguments.qmgr, params.arguments.cmd);
    }
}
