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

import { ITestEnvironment } from "@zowe/cli-test-utils";
import { Session } from "@zowe/imperative";
import { ITestPropertiesSchema } from "./doc/ITestPropertiesSchema";

/**
 * Create an MQ based session from properties present in your test environment
 * @param testEnvironment - your test environment with system test properties populated
 */
export function createSession(testEnvironment: ITestEnvironment<ITestPropertiesSchema>): Session {
    const SYSTEM_PROPS = testEnvironment.systemTestProperties;
    return new Session({
        user: SYSTEM_PROPS.mq.user,
        password: SYSTEM_PROPS.mq.password,
        hostname: SYSTEM_PROPS.mq.host,
        port: SYSTEM_PROPS.mq.port,
        type: "basic",
        rejectUnauthorized: false,
        basePath: SYSTEM_PROPS.mq.basepath
    });
}
