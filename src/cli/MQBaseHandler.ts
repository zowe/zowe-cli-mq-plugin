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

import { AbstractSession, ICommandHandler, IHandlerParameters, IProfile } from "@zowe/imperative";
import { IMQResponse } from "../doc/IMQResponse";
import { MqSession } from "./MQSession";

/**
 * This class is used by the various mq handlers as the base class for their implementation.
 * All handlers should extend this class whenever possible
 */
export default abstract class MqBaseHandler implements ICommandHandler {
    /**
     * This will grab the mq profile and create a session before calling the subclass
     * {@link MqBaseHandler#processWithSession} method.
     *
     * @param {IHandlerParameters} commandParameters Command parameters sent by imperative.
     *
     * @returns {Promise<IMQResponse>}
     */
    public async process(commandParameters: IHandlerParameters) {
        const profile = commandParameters.profiles.get("mqrest", false) || {};
        const session = MqSession.createBasicMqSessionFromArguments(profile);

        const response = await this.processWithSession(commandParameters, session, profile);

        commandParameters.response.progress.endBar(); // end any progress bars
        // Print out the response
        if (response  && response.commandResponse && response.commandResponse[0]) {
            // tslint:disable-next-line:no-magic-numbers
            commandParameters.response.console.log(JSON.stringify(response.commandResponse[0].text, null, 4));
        }
        // Return as an object when using --response-format-json
        commandParameters.response.data.setObj(response);
    }

    /**
     * This is called by the {@link MqBaseHandler#process} after it creates a session. Should
     * be used so that every class does not have to instantiate the session object.
     *
     * @param {IHandlerParameters} commandParameters Command parameters sent to the handler.
     * @param {AbstractSession} session The session object generated from the mq profile.
     * @param {IProfile} mqProfile The mq profile that was loaded for the command.
     *
     * @returns {Promise<IMQResponse>} The response from the underlying mq api call.
     */
    public abstract async processWithSession(
        commandParameters: IHandlerParameters,
        session: AbstractSession,
        mqProfile: IProfile
    ): Promise<IMQResponse>;
}
