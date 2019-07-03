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

import { IImperativeConfig } from "@brightside/imperative";
import { PluginConstants } from "./rest/constants/PluginConstants";
import { MqSessionUtils } from "./cli/MQSessionUtils";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: PluginConstants.PLUGIN_DESCRIPTION,
    productDisplayName: PluginConstants.PLUGIN_NAME,
    name: PluginConstants.PLUGIN_GROUP_NAME,
    pluginHealthCheck: __dirname + "/healthCheck.Handler",
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
                  optionDefinition: MqSessionUtils.MQ_OPTION_REJECT_UNAUTHORIZED
              },
              protocol: {
                  type: "string",
                  optionDefinition: MqSessionUtils.MQ_OPTION_PROTOCOL
              }
            },
            required: ["host", "port", "user", "password"],
          },
          createProfileExamples: [
            {
             options: "mq --host mq123 --port 1234 --user ibmuser --password myp4ss",
             description: "Create an MQ profile named 'mqprofile' to connect to MQ at host zos123 and port 1234"
            }
          ]
        }
    ]
};

export = config;
