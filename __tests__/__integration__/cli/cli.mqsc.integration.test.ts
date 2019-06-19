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

// Test environment will be populated in the "beforeAll"
import { ITestEnvironment } from "../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../__src__/environment/TestEnvironment";
import { runCliScript } from "../../__src__/TestUtils";

let TEST_ENVIRONMENT: ITestEnvironment;
describe("mq mqsc", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "mqsc_command",
            installPlugin: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should display the mqsc help", async () => {
        const response = await runCliScript(__dirname + "/__scripts__/mqsc_help.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });
});
