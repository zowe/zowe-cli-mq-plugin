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

import { MqSessionUtils } from "../../src/cli/MQSessionUtils";
import { Session, ICommandArguments, Logger } from "@zowe/imperative";

describe.only("Tests utils functions not covered elsewhere", () => {
    it.only("should create a session object", async () => {
        const args: ICommandArguments = {
            $0: "",
            _: [],

            hostname: "boppyhost",
            port: "port",
            user: "auser",
            password: "apassword",
            basePath: "abasePath",
            rejectUnauthorized: "arejectUnauthorized",
            protocol: "aprotocol"

        };
       // const session: Session = await MqSessionUtils.createBasicMqSessionFromArguments(args);
        // Logger.getConsoleLogger().info(`hostname ${session.ISession.hostname}`);
        // expect(session.ISession.hostname).toEqual("boppyhost");
        // expect(session.ISession.protocol).toEqual("aprotocol");
    });
});
