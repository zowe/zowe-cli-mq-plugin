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

import { ITestEnvironment, TestEnvironment } from "@zowe/cli-test-utils";
import { ITestPropertiesSchema } from "../../__src__/doc/ITestPropertiesSchema";
import MQSCCommand from "../../../src/api/MQSCCommand";
import { Session } from "@zowe/imperative";
import { IMQResponse } from "../../../src/api/doc/IMQResponse";
import * as TestUtils from "../../__src__/TestUtils";
let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let mqProperties: ITestPropertiesSchema;
let session: Session;
let response: IMQResponse;

describe("MQSC API tests", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "mq_mqsc",
        });
        mqProperties = await testEnvironment.systemTestProperties;
        session = TestUtils.createSession(testEnvironment);

        // Create queue
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.mq.qmgr, mqProperties.test.setup.cmd);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        // Command Response modified after pop()
        expect(response.commandResponse[0].text.pop()).toContain(mqProperties.test.setup.expect);
    });

    afterAll(async () => {
        // Delete queue
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.mq.qmgr, mqProperties.test.teardown.cmd);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        // Command Response modified after pop()
        expect(response.commandResponse[0].text.pop()).toContain(mqProperties.test.teardown.expect);
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("should query the server without options", async () => {
        try {
            response = await MQSCCommand.qmgrAction(session, mqProperties.mq.qmgr, mqProperties.test.run.cmd);
        } catch (err) {
            expect(err).toBeFalsy();
        }
        expect(response).toBeTruthy();
        expect(response.overallReasonCode).toBe(0);
        expect(response.overallCompletionCode).toBe(0);
        expect(response.commandResponse[0].completionCode).toBe(0);
        expect(response.commandResponse[0].reasonCode).toBe(0);
        // Command Response modified after pop()
        expect(response.commandResponse[0].text.pop()).toContain(mqProperties.test.run.expect);
    });
});
