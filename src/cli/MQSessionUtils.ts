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

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger, Session } from "@brightside/imperative";

/**
 * Utility Methods for Zowe
 * @export
 */
export class MqSessionUtils {

    public static MQ_CONNECTION_OPTION_GROUP = "MQ Connection Options";

    /**
     *
     * Option used in profile creation and commands for hostname for MQ
     */
    public static MQ_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        aliases: ["H"],
        description: "The host name used to access the IBM MQ REST API. " +
            "This might be the host name of the IBM MQ mqweb server, or the Zowe API Mediation Layer..",
        type: "string",
        required: false,
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for MQ
     */
    public static MQ_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        aliases: ["P"],
        description: "The port number used to access the IBM MQ REST API. " +
            "This might be the port number of the IBM MQ mqweb server, or the Zowe API Mediation Layer.",
        type: "number",
        required: false,
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for MQ
     */
    public static MQ_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["u"],
        description: "The mainframe (MQ) user name, which can be the same as your TSO login.",
        type: "string",
        required: false,
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for MQ
     */
    public static MQ_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pass", "pw"],
        description: "The mainframe (MQ) password, which can be the same as your TSO password.",
        type: "string",
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP,
        required: false
    };

    /**
     * Option used in profile creation and commands for rejectUnauthorized setting for connecting to FMP
     */
    public static MQ_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
        name: "reject-unauthorized",
        aliases: ["ru"],
        description: "Reject self-signed certificates.",
        type: "boolean",
        defaultValue: false,
        required: false,
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP
    };
    /**
     * Option used in profile creation and commands for protocol for MQ
     */
    public static MQ_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        aliases: ["o"],
        description: "Specifies the MQ protocol (http or https).",
        type: "string",
        defaultValue: "http",
        required: false,
        allowableValues: {values: ["http", "https"], caseSensitive: false},
        group: MqSessionUtils.MQ_CONNECTION_OPTION_GROUP
    };

    /**
     * Options related to connecting to MQ
     * These options can be filled in if the user creates a profile
     */
    public static MQ_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        MqSessionUtils.MQ_OPTION_HOST,
        MqSessionUtils.MQ_OPTION_PORT,
        MqSessionUtils.MQ_OPTION_USER,
        MqSessionUtils.MQ_OPTION_PASSWORD,
        MqSessionUtils.MQ_OPTION_REJECT_UNAUTHORIZED,
        MqSessionUtils.MQ_OPTION_PROTOCOL
    ];

    /**
     * Given a MQ profile, create a REST Client Session.
     * @static
     * @param {IProfile} profile - The MQ profile contents
     * @returns {Session} - A session for usage in the MQ REST Client
     */
    public static createBasicMqSession(profile: IProfile): Session {
        MqSessionUtils.log.trace("Creating an MQ session from the profile named %s", profile.name);
        return new Session({
            type: "basic",
            hostname: profile.host,
            port: profile.port,
            user: profile.user,
            password: profile.password,
            basePath: profile.basePath,
            rejectUnauthorized: profile.rejectUnauthorized,
            protocol: profile.protocol || "https",
        });
    }

    /**
     * Given a MQ profile, create a REST Client Session.
     * @static
     * @param {IProfile} profile - The MQ profile contents
     * @returns {Session} - A session for usage in the MQ REST Client
     */
    public static createBasicMqSessionFromArguments(args: ICommandArguments): Session {
        MqSessionUtils.log.trace("Creating an MQ session from arguments", args.name);
        return new Session({
            type: args.password && args.user? "basic": "none",
            hostname: args.host,
            port: args.port,
            user: args.user,
            password: args.password,
            basePath: args.basePath,
            rejectUnauthorized: args.rejectUnauthorized,
            protocol: args.protocol || "https",
        });
    }

    /**
     * Internal logger
     */
    private static mLogger: Logger;

    /**
     * Use the Brightside logger instead of the imperative logger
     * @return {Logger}
     */
    private static get log(): Logger {
        if (this.mLogger == null) {
            this.mLogger = Logger.getAppLogger();
        }
        return this.mLogger;
    }
}
