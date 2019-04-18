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
import { PluginConstants } from "./constants/PluginConstants";
import { MqSession } from "./cli/MQSession";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: PluginConstants.PLUGIN_DESCRIPTION,
    productDisplayName: PluginConstants.PLUGIN_NAME,
    name: PluginConstants.PLUGIN_GROUP_NAME,
    pluginHealthCheck: __dirname + "/healthCheck.Handler",
    pluginAliases: ["zmqsc"],
    profiles: [
        {
          type: "mqrest",
          schema: {
            type: "object",
            title: "CLI profile for MQ",
            description: "CLI profile for MQ",
            properties: {
              host: {
                type: "string",
                optionDefinition: {
                  name: "host",
                  aliases: ["H"],
                  description: "The MQ Rest server host name",
                  type: "string",
                  required: true,
                }
              },
              port: {
                type: "number",
                optionDefinition: {
                  type: "number",
                  name: "port",
                  aliases: ["P"],
                  required: true,
                  description: "Port number of your MQ REST API server"
                }
              },
              user: {
                type: "string",
                optionDefinition: {
                  type: "string",
                  name: "user",
                  aliases: ["u"],
                  required: true,
                  description: "User name to authenticate to your MQ REST API server"
                },
                secure: true
              },
              password: {
                type: "string",
                optionDefinition: {
                  type: "string",
                  name: "password",
                  aliases: ["p"],
                  required: true,
                  implies: ["user"],
                  description: "Password to authenticate to your MQ REST API server"
                },
                secure: true
              },
              rejectUnauthorized: {
                  type: "boolean",
                  optionDefinition: MqSession.MQ_OPTION_REJECT_UNAUTHORIZED
              },
              protocol: {
                  type: "string",
                  optionDefinition: MqSession.MQ_OPTION_PROTOCOL
              }
            },
            required: ["host", "port", "user", "password"],
          },
          createProfileExamples: [
            {
             options: "mqrest --host mq123 --port 1234 --user ibmuser --password myp4ss",
             description: "Create an MQ profile named 'mqprofile' to connect to MQ at host zos123 and port 1234"
            }
          ]
        }
    ]
};

export = config;
