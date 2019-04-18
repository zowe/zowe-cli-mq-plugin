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

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger, Session } from "@zowe/imperative";

/**
 * Utility Methods for Brightside
 * @export
 */
export class MqSession {

    public static MQ_CONNECTION_OPTION_GROUP = "MQ Connection Options";

    /**
     * Option used in profile creation and commands for hostname for MQ
     */
    public static MQ_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        aliases: ["H"],
        description: "The MQ server host name.",
        type: "string",
        required: true,
        group: MqSession.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for MQ
     */
    public static MQ_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        aliases: ["P"],
        description: "The MQ server port.",
        type: "number",
        defaultValue: 443,
        group: MqSession.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for MQ
     */
    public static MQ_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["u"],
        description: "Mainframe (MQ) user name, which can be the same as your TSO login.",
        type: "string",
        required: true,
        group: MqSession.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for MQ
     */
    public static MQ_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pw"],
        description: "Mainframe (MQ) password, which can be the same as your TSO password.",
        type: "string",
        group: MqSession.MQ_CONNECTION_OPTION_GROUP,
        required: true
    };

    /**
     * Option used in profile creation and commands for rejectUnauthorized setting for connecting to FMP
     */
    public static MQ_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
        name: "reject-unauthorized",
        aliases: ["ru"],
        description: "Reject self-signed certificates.",
        type: "boolean",
        defaultValue: true,
        required: false,
        group: MqSession.MQ_CONNECTION_OPTION_GROUP
    };
    /**
     * Option used in profile creation and commands for protocol for MQ
     */
    public static MQ_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        aliases: ["o"],
        description: "Specifies MQ protocol (http or https).",
        type: "string",
        defaultValue: "http",
        required: true,
        allowableValues: {values: ["http", "https"], caseSensitive: false},
        group: MqSession.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Options related to connecting to MQ
     * These options can be filled in if the user creates a profile
     */
    public static MQ_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        MqSession.MQ_OPTION_HOST,
        MqSession.MQ_OPTION_PORT,
        MqSession.MQ_OPTION_USER,
        MqSession.MQ_OPTION_PASSWORD,
        MqSession.MQ_OPTION_REJECT_UNAUTHORIZED,
        MqSession.MQ_OPTION_PROTOCOL
    ];

    /**
     * Given a MQ profile, create a REST Client Session.
     * @static
     * @param {IProfile} profile - The MQ profile contents
     * @returns {Session} - A session for usage in the MQ REST Client
     */
    public static createBasicMqSession(profile: IProfile): Session {
        this.log.debug("Creating an MQ session from the profile named %s", profile.name);
        return new Session({
            type: "basic",
            hostname: profile.host,
            port: profile.port,
            user: profile.user,
            password: profile.pass,
            basePath: profile.basePath,
            protocol: profile.protocol || "https",
        });
    }

    /**
     * Given command line arguments, create a REST Client Session.
     * @static
     * @param {IProfile} args - The arguments specified by the user
     * @returns {Session} - A session for usage in the MQ REST Client
     */
    public static createBasicMqSessionFromArguments(args: IProfile): Session {
        this.log.debug("Creating a MQ session from arguments");
        return new Session({
            type: "basic",
            hostname: args.host,
            port: args.port,
            user: args.user,
            password: args.password,
            basePath: args.basePath,
            rejectUnauthorized: args.rejectUnauthorized,
            protocol: args.protocol || "https",
        });
    }


    private static get log(): Logger {
        return Logger.getAppLogger();
    }
}
