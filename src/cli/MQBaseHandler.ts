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

import { ICommandHandler, IHandlerParameters, IProfile, ITaskWithStatus, TaskStage } from "@zowe/imperative";
import { IMQResponse } from "../api/doc/IMQResponse";
import { MqSessionUtils } from "./MQSessionUtils";
import { MQSession } from "../api/rest/MQSession";

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

        const session = await MqSessionUtils.createSessCfgFromArgs(commandParameters.arguments);

        const task: ITaskWithStatus = {
            percentComplete: 0,
            statusMessage: "Running MQ Command",
            stageName: TaskStage.IN_PROGRESS
        };
        if (commandParameters.arguments.cmd && commandParameters.arguments.qmgr) {
            commandParameters.response.console.log("Running MQSC command: " +
                "'" + commandParameters.arguments.cmd + "'"  + " against " +
                     commandParameters.arguments.qmgr + "\n");
        }

        commandParameters.response.progress.startBar({task});
        const response = await this.processWithSession(commandParameters, session, profile);

        commandParameters.response.progress.endBar(); // end any progress bars

        commandParameters.response.data.setObj(response);
        // Print out the response
        if (response  && response.commandResponse && response.commandResponse[0]) {
            for (const resp of response.commandResponse) {
                const mqResponse = resp.text;
                const result = JSON.stringify(mqResponse);
                const mqJSON = JSON.parse(result);
                let start = true;
                let success = false;
                for (const line of mqJSON) {
                    let modifiedLine = line;
                    if (start && modifiedLine.indexOf("CSQN205I") >= 0 ) {
                        success = modifiedLine.indexOf("RETURN=00000000") >= 0;
                    } else if (success) {
                        // remove whitespace between parenthesis but allow within quotes
                        modifiedLine = modifiedLine.replace(/\s+(?=[^()\D\"]*\))/g, "");
                        modifiedLine = modifiedLine.replace(/\) /g, ") \n\t"); // New line and tab after each parenthesis
                        modifiedLine = modifiedLine.replace(/\n\tNOHARDENBO /g, "\n\tNOHARDENBO\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\n\tHARDENBO /g, "\n\tHARDENBO\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\n\tNOTRIGGER /g, "\n\tNOTRIGGER\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\n\tTRIGGER /g, "\n\tTRIGGER\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\n\tNOSHARE /g, "\n\tNOSHARE\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\n\tSHARE /g, "\n\tSHARE\n\t"); // anything starting NO...
                        modifiedLine = modifiedLine.replace(/\] /g, " ");
                        modifiedLine = modifiedLine.replace(/\)\) /g, "%29"); // Special case parameter
                        modifiedLine = modifiedLine.replace(/%29 /g, "))"); // Special case parameter
                        modifiedLine = modifiedLine.replace("]", " "); // Remove ending "]"
                        commandParameters.response.console.log(modifiedLine);
                    } else {
                        commandParameters.response.console.log(line);
                    }
                    start = false;
                }
            }
        }
    }

    /**
     * This is called by the {@link MqBaseHandler#process} after it creates a session. Should
     * be used so that every class does not have to instantiate the session object.
     *
     * @param {IHandlerParameters} commandParameters Command parameters sent to the handler.
     * @param {MQSession} session The session object generated from the mq profile.
     * @param {IProfile} mqProfile The mq profile that was loaded for the command.
     *
     * @returns {Promise<IMQResponse>} The response from the underlying mq api call.
     */
    public abstract async processWithSession(
        commandParameters: IHandlerParameters,
        session: MQSession,
        mqProfile: IProfile
    ): Promise<IMQResponse>;
}
