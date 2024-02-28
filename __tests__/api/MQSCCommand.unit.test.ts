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

import { RestClient } from "@zowe/imperative";
import MQSCCommand from "../../src/api/MQSCCommand";

describe("Run a command", () => {
    const dummySession: any = {};
    const queueMgrName = "testing";
    const command = "DEFINE CHANNEL(NEWSVRCONN) CHLTYPE(SVRCONN)";

    let mySpy: any;
    const mainResponse = {
        commandResponse: [
            {
                completionCode: 2, reasonCode: 2085, text: "AMQ8147: IBM MQ object NEWSVRCONN not found."
            }
        ],
        overallCompletionCode: 2,
        overallReasonCode: 3008
    } as any;

    beforeEach(() => {
        mySpy = jest.spyOn(RestClient, "postExpectJSON").mockReturnValue(mainResponse);
    });

    afterEach(() => {
        mySpy.mockReset();
        mySpy.mockRestore();
    });

    describe("Success scenarios", () => {
        it("should be able to submit a command nut override csrf", async () => {
            const response = await MQSCCommand.qmgrAction(dummySession, queueMgrName, command, false );
            expect(response.commandResponse[0].text).toEqual("AMQ8147: IBM MQ object NEWSVRCONN not found.");
            expect(response.overallCompletionCode).toEqual(2);
            expect(mySpy).toHaveBeenCalledWith(dummySession,
                "/ibmmq/rest/v1/admin/action/qmgr/testing/mqsc",
                [{"Content-Type": "application/json"}],
                {parameters: {command: "DEFINE CHANNEL(NEWSVRCONN) CHLTYPE(SVRCONN)"}, type: "runCommand"});
        });

        it("should be able to submit a command with CSRF header", async () => {
            const response = await MQSCCommand.qmgrAction(dummySession, queueMgrName, command );
            expect(response.commandResponse[0].reasonCode).toEqual(2085);
            expect(response.overallCompletionCode).toEqual(2);
            expect(mySpy).toHaveBeenCalledWith(dummySession, "/ibmmq/rest/v1/admin/action/qmgr/testing/mqsc",
                [{"Content-Type": "application/json"}, {"ibm-mq-rest-csrf-token": "true"}],
                {parameters: {command: "DEFINE CHANNEL(NEWSVRCONN) CHLTYPE(SVRCONN)"}, type: "runCommand"});
        });

        it("should be fail to submit a command because queueMgrName is undefined", async () => {
            let response;
            let error;
            try {
                response = await MQSCCommand.qmgrAction(dummySession, undefined, command );
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Missing Queue manager name.");
        });

        it("should be fail to submit a command because queueMgrName is empty", async () => {
            let response;
            let error;
            try {
                response = await MQSCCommand.qmgrAction(dummySession, "", command );
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Required parameter 'qmgr' must not be blank");
        });
        it("should be fail to submit a command because command is undefined", async () => {
            let response;
            let error;
            try {
                response = await MQSCCommand.qmgrAction(dummySession, queueMgrName, undefined );
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Missing action command.");
        });

        it("should be fail to submit a command because command is empty", async () => {
            let response;
            let error;
            try {
                response = await MQSCCommand.qmgrAction(dummySession, queueMgrName, "" );
            } catch (err) {
                error = err;
            }

            expect(response).toBeUndefined();
            expect(error).toBeDefined();
            expect(error.message).toContain("Required parameter 'cmd' must not be blank");
        });
    });
});
