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

import { ITestEnvironment } from "../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../__src__/environment/TestEnvironment";
import MQSCCommand from "../../../src/api/MQSCCommand";
import { Session } from "@brightside/imperative";
import { IMQResponse } from "../../../src/doc/IMQResponse";
let testEnvironment: ITestEnvironment;
let mqProperties: any;
let session: Session;
let response: IMQResponse;

describe("MQSC API tests", () => {

     beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "mq_mqsc",
        });
        mqProperties = await testEnvironment.systemTestProperties.mq;
        session = TestEnvironment.createSession(testEnvironment);

        // Create queue
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.qmgr, mqProperties.script1);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        expect(response.commandResponse[0].text[1]).toContain("CSQ9022I ]MQ21 CSQMAQLC ' DEFINE QL' NORMAL COMPLETION");
    });

     afterAll(async () => {
        // Delete queue
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.qmgr, mqProperties.script3);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        expect(response.commandResponse[0].text[1]).toContain("DESCR(A test queue to play with for Zowe");
        await TestEnvironment.cleanUp(testEnvironment);
    });

     it.only("should query the server without options", async () => {
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.qmgr, mqProperties.script2);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        expect(response.commandResponse[0].text[1]).toContain("DESCR(A test queue to play with for Zowe");
        expect(response.commandResponse[0].text[1]).toContain("QDPMAXEV(ENABLED");
    });
});
