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

import { ICommandArguments, Logger, Session } from "@zowe/imperative";
import { MqSessionUtils } from "../../src/cli/MQSessionUtils";

describe("Tests utils functions not covered elsewhere", () => {
    it("should create a session object", async () => {
        const args: ICommandArguments = {
            $0: "",
            _: [],

            host: "boppyhost",
            port: "port",
            user: "auser",
            password: "apassword",
            basePath: "abasePath",
            rejectUnauthorized: "arejectUnauthorized"

        };
        const session: Session = await MqSessionUtils.createBasicMqSessionFromArguments(args);
        Logger.getConsoleLogger().info(`hostname ${session.ISession.hostname}`);
        expect(session.ISession.hostname).toEqual("boppyhost");
        expect(session.ISession.protocol).toEqual("https");
    });
});
