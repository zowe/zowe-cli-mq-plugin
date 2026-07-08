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

    it("should default reject-unauthorized to true so certificate validation is on by default", () => {
        expect(MqSessionUtils.MQ_OPTION_REJECT_UNAUTHORIZED.defaultValue).toBe(true);
    });

    it("should default protocol to https so connections are encrypted by default", () => {
        expect(MqSessionUtils.MQ_OPTION_PROTOCOL.defaultValue).toBe("https");
    });

    it("should create a session that validates certificates over https using the secure defaults", async () => {
        const args: ICommandArguments = {
            $0: "",
            _: [],
            host: "boppyhost",
            port: "port",
            user: "auser",
            password: "apassword",
            basePath: "abasePath",
            protocol: MqSessionUtils.MQ_OPTION_PROTOCOL.defaultValue,
            rejectUnauthorized: MqSessionUtils.MQ_OPTION_REJECT_UNAUTHORIZED.defaultValue
        };
        const session: Session = await MqSessionUtils.createSessCfgFromArgs(args, false);
        expect(session.ISession.protocol).toEqual("https");
        expect(session.ISession.rejectUnauthorized).toBe(true);
    });

    it("should honor an explicit opt-out of certificate validation for self-signed dev environments", async () => {
        const args: ICommandArguments = {
            $0: "",
            _: [],
            host: "boppyhost",
            port: "port",
            user: "auser",
            password: "apassword",
            basePath: "abasePath",
            protocol: "https",
            rejectUnauthorized: false
        };
        const session: Session = await MqSessionUtils.createSessCfgFromArgs(args, false);
        expect(session.ISession.rejectUnauthorized).toBe(false);
    });
});
