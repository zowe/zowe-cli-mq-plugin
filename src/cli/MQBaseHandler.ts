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

import { AbstractSession, ICommandHandler, IHandlerParameters, IProfile, ITaskWithStatus, TaskStage } from "@brightside/imperative";
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
        const profile = commandParameters.profiles.get("mq", false) || {};
        const session = MqSession.createBasicMqSession(profile);

        const task: ITaskWithStatus = {
            percentComplete: 0,
            statusMessage: "Running MQ Command",
            stageName: TaskStage.IN_PROGRESS
        };
        if (commandParameters.arguments.cmd && commandParameters.arguments.queuemgr) {
            commandParameters.response.console.log("Running MQ command: " +
                "'" + commandParameters.arguments.cmd + "'"  + " against " + commandParameters.arguments.queuemgr);
        }

        // commandParameters.response.progress.startBar({task});
        // tslint:disable-next-line:no-magic-numbers
        // await this.delay(7000);
        const response = await this.processWithSession(commandParameters, session, profile);

        // Print out the response
        if (response  && response.commandResponse && response.commandResponse[0]) {
            const mqResponse = response.commandResponse[0].text;
            const result = JSON.stringify(mqResponse);
            const mqJSON = JSON.parse(result);

            let start = true;
            let success = false;
            for (const line of mqJSON) {
                let modifiedLine = line;
                if (start && modifiedLine.indexOf("CSQN205I") > -1 && modifiedLine.indexOf("RETURN=00000000") > -1) {
                    success = true;
                    modifiedLine = modifiedLine.replace(/\s+(?=(COUNT=)*(\d))/, ""); // remove whitespace after word COUNT=
                } else if (success) {
                    modifiedLine = modifiedLine.replace(/\s+(?=[^()\"]*\))/g, ""); // remove whitespace between parenthesis but allow within quotes
                    modifiedLine = modifiedLine.replace(/\] /g, " ");
                    modifiedLine = modifiedLine.replace(/\)\) /g, "%29"); // Special case parameter
                    modifiedLine = modifiedLine.replace(/\) /g, ") \n\t"); // New line and tab after each parenthesis
                    modifiedLine = modifiedLine.replace(/%29 /g, "))"); // Special case parameter
                    modifiedLine = modifiedLine.replace("]", " "); // Remove ending "]"
                } else {
                    // TODO
                }
                commandParameters.response.console.log(modifiedLine);
                start = false;
            }
        }
        commandParameters.response.progress.endBar(); // end any progress bars
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
