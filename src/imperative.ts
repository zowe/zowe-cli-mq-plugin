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

import { IImperativeConfig } from "@zowe/imperative";
import { PluginConstants } from "./api/rest/constants/PluginConstants";
import { MqSessionUtils } from "./cli/MQSessionUtils";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: PluginConstants.PLUGIN_DESCRIPTION,
    productDisplayName: PluginConstants.PLUGIN_NAME,
    name: PluginConstants.PLUGIN_GROUP_NAME,
    // apimlConnLookup: [
    //     {
    //         apiId: "place_the_mq_apiId_here",
    //         gatewayUrl: "api/v1",
    //         connProfType: "mq"
    //     }
    // ],
    profiles: [
        {
            type: "mq",
            schema: {
                type: "object",
                title: "CLI profile for MQ",
                description: "An MQREST profile is required to issue commands in the MQ command group that interacts with MQSC. " +
                "The mq profile contains your host, port, user name, and password for the IBM MQ System Console interface",
                properties: {
                    host: {
                        type: "string",
                        optionDefinition: MqSessionUtils.MQ_OPTION_HOST,
                    },
                    port: {
                        type: "number",
                        optionDefinition: MqSessionUtils.MQ_OPTION_PORT,
                    },
                    user: {
                        type: "string",
                        optionDefinition: MqSessionUtils.MQ_OPTION_USER,
                        secure: true
                    },
                    password: {
                        type: "string",
                        optionDefinition: MqSessionUtils.MQ_OPTION_PASSWORD,
                        secure: true
                    },
                    rejectUnauthorized: {
                        type: "boolean",
                        optionDefinition: MqSessionUtils.MQ_OPTION_REJECT_UNAUTHORIZED
                    },
                    protocol: {
                        type: "string",
                        optionDefinition: MqSessionUtils.MQ_OPTION_PROTOCOL
                    }
                },
                required: [],
            }
        }
    ]
};

export = config;
