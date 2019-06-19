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

import { runCliScript } from "../../__src__/TestUtils";
import { ITestEnvironment } from "../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../__src__/environment/TestEnvironment";

let testEnvironment: ITestEnvironment;
let mqProperties: any;

describe.only("mq mqsc cli", () => {
    // Create the unique test environment
    beforeAll(async () => {
        testEnvironment = await TestEnvironment.setUp({
            testName: "queue_manager_command",
            installPlugin: true,
            tempProfileTypes: ["mq"]
        });
        mqProperties = await testEnvironment.systemTestProperties.mq;

        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.queuemgr, mqProperties.script1]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("CSQ9022I  MQ21 CSQMAQLC ' DEFINE QL' NORMAL COMPLETION");
    });

    afterAll(async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.queuemgr, mqProperties.script3]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("CSQ9022I  MQ21 CSQMUQLC ' DELETE QL' NORMAL COMPLETION");
        await TestEnvironment.cleanUp(testEnvironment);
    });


    it.only("should be able to successfully get resources using profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_queue_manager.sh", testEnvironment,
            [mqProperties.queuemgr, mqProperties.script2]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("QDEPTHHI(80)");
        expect(stdout).toContain("CSQ9022I  MQ21 CSQMDRTS ' DISPLAY QLOCAL' NORMAL COMPLETION");
    });
});
