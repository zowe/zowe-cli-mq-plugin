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

import { SessConstants } from "@zowe/imperative";

/**
 * Interface representing the values in the custom_properties.yaml file
 * see example_properties.yaml for descriptions and more details
 */
export interface ITestPropertiesSchema {

    /**
     * Properties related to connecting to MQ
     */
    mq: {
        /**
         * user ID to connect to MQ
         */
        user: string,
        /**
         * Password to connect to MQ
         */
        password: string,
        /**
         * host name for  MQ
         */
        host: string,
        /**
         * Port for MQ
         */
        port?: number,
        /**
         * The reject unauthorized indicator
         */
        rejectUnauthorized: boolean,
        /**
         * The location of the API
         */
        basepath: string,
        /**
         * Protocol for MQ
         */
        protocol?: SessConstants.HTTP_PROTOCOL_CHOICES,
        /**
         * The Queue manager
         */
        qmgr: string
    };

    test: {
        setup: {
            cmd: string,
            expect: string
        },
        run: {
            cmd: string,
            expect: string
        },
        teardown: {
            cmd: string,
            expect: string
        }
    };

}

