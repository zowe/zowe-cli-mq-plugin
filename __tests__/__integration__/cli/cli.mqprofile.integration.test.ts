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
import { readFileSync } from "fs";

let testEnvironment: ITestEnvironment<ITestPropertiesSchema>;
describe("Creating an MQ profile", () => {

    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            installPlugin: true,
            testName: "mq_profile",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(testEnvironment);
    });

    it("should create an MQ profile successfully with fake connection details", () => {
        const output = runCliScript(__dirname + "/__scripts__/create_mq_profile.sh", testEnvironment);
        const outStr = output.stdout.toString();
        expect(outStr).toContain("Saved config template to ");

        const zoweConfigJson = JSON.parse(readFileSync(testEnvironment.workingDir + "/zowe.config.json").toString());

        expect(zoweConfigJson.defaults.mq).toBeDefined();
        expect(output.status).toEqual(0);
    });
});
