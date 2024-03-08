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

import { ITestEnvironment, TestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { ITestPropertiesSchema } from "../../__src__/doc/ITestPropertiesSchema";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
let mqProperties: ITestPropertiesSchema;

describe("mq mqsc cli", () => {
    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "queue_manager_command",
            installPlugin: true,
            tempProfileTypes: ["mq"]
        });
        mqProperties = testEnvironment.systemTestProperties;

        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.mq.qmgr, mqProperties.test.setup.cmd]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain(mqProperties.test.setup.expect);
    });

    afterAll(async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.mq.qmgr, mqProperties.test.teardown.cmd]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain(mqProperties.test.teardown.expect);
        await TestEnvironment.cleanUp(testEnvironment);
    });


    it("should be able to successfully get resources using profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.mq.qmgr, mqProperties.test.run.cmd]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain(mqProperties.test.run.expect);
    });

    it("should be able to successfully get resources using host options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.override.sh", testEnvironment,
            [mqProperties.mq.qmgr, mqProperties.test.run.cmd, mqProperties.mq.host,
                mqProperties.mq.port, mqProperties.mq.user, mqProperties.mq.password,
            ]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain(mqProperties.test.run.expect);
    });
});
