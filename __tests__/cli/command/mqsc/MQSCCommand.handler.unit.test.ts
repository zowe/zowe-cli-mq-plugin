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

import MQSCCommand from "../../../../src/api/MQSCCommand";

describe("MQ Command handler", () => {

        it("should provide a response", async () => {
            // Require the handler and create a new instance
            const handlerReq = require("../../../../src/cli/command/mqsc/MQSCCommand.handler");
            const handler = new handlerReq.default();
            const queuemgr = "testQ";
            const cmd = "fakeNews";

            // Vars populated by the mocked function
            let error;
            let apiMessage = "";
            let jsonObj;
            let logMessage = "";
            let fakeSession = null;

            // Mock the qmgrAction function
            MQSCCommand.qmgrAction = jest.fn((session) => {
                fakeSession = session;
                return {
                    success: true,
                    commandResponse:[
                        {
                          completionCode: 0,
                          reasonCode: 0,
                          text: [
                            "CSQN205I   COUNT=       3, RETURN=00000000, REASON=00000000",
                            "CSQM297I ]MQ21 CSQMDRTS NO CHANNEL FOUND MATCHING REQUEST CRITERIA ",
                            "CSQ9022I ]MQ21 CSQMDRTS ' DISPLAY CHANNEL' NORMAL COMPLETION "
                          ],
                        }
                    ],
                    overallCompletionCode: "200",
                    overallReasonCode: "Great"
                };
            });


            // Mocked function references
            const profFunc = jest.fn((args) => {
                return {
                    host: "fake",
                    port: "fake",
                    user: "fake",
                    password: "fake",
                    auth: "fake",
                    rejectUnauthorized: "fake",
                };
            });

            try {
                // Invoke the handler with a full set of mocked arguments and response functions
                await handler.process({
                    arguments: {
                        $0: "fake",
                        _: ["fake"],
                        queuemgr, cmd,
                        ...{
                            host: "somewhere.com",
                            port: "43443",
                            user: "someone",
                            password: "somesecret"
                        }
                    },
                    response: {
                        data: {
                            setMessage: jest.fn((setMsgArgs) => {
                                apiMessage = setMsgArgs;
                            }),
                            setObj: jest.fn((setObjArgs) => {
                                jsonObj = setObjArgs;
                            })
                        },
                        console: {
                            log: jest.fn((logArgs) => {
                                logMessage += "\n" + logArgs;
                            })
                        },
                        progress: {
                            startBar: jest.fn((parms) => {
                                // do nothing
                            }),
                            endBar: jest.fn(() => {
                                // do nothing
                            })
                        }
                    },
                    profiles: {
                        get: profFunc
                    }
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeUndefined();
            expect(profFunc).toHaveBeenCalledWith("mqrest", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, cmd, undefined);
            expect(jsonObj).toMatchSnapshot();
            expect(apiMessage).toMatchSnapshot();
            expect(logMessage).toMatchSnapshot();
        });

        it("should provide a response with quotes around the command", async () => {
            // Require the handler and create a new instance
            const handlerReq = require("../../../../src/cli/command/mqsc/MQSCCommand.handler");
            const handler = new handlerReq.default();
            const queuemgr = "testQ";
            const cmd = "\"fakeNews\"";

            // Vars populated by the mocked function
            let error;
            let apiMessage = "";
            let jsonObj;
            let logMessage = "";
            let fakeSession = null;

            // Mock the qmgrAction function
            MQSCCommand.qmgrAction = jest.fn((session) => {
                fakeSession = session;
                return {
                    success: true,
                    commandResponse:[
                        {
                          completionCode: 0,
                          reasonCode: 0,
                          text: [
                            "CSQN205I   COUNT=       3, RETURN=00000000, REASON=00000000",
                            "CSQM297I ]MQ21 CSQMDRTS NO CHANNEL FOUND MATCHING REQUEST CRITERIA ",
                            "CSQ9022I ]MQ21 CSQMDRTS ' DISPLAY CHANNEL' NORMAL COMPLETION "
                          ],
                        }
                    ],
                    overallCompletionCode: "200",
                    overallReasonCode: "Great"
                };
            });


            // Mocked function references
            const profFunc = jest.fn((args) => {
                return {
                    host: "fake",
                    port: "fake",
                    user: "fake",
                    password: "fake",
                    auth: "fake",
                    rejectUnauthorized: "fake",
                };
            });

            try {
                // Invoke the handler with a full set of mocked arguments and response functions
                await handler.process({
                    arguments: {
                        $0: "fake",
                        _: ["fake"],
                        queuemgr, cmd,
                        ...{
                            host: "somewhere.com",
                            port: "43443",
                            user: "someone",
                            password: "somesecret"
                        }
                    },
                    response: {
                        data: {
                            setMessage: jest.fn((setMsgArgs) => {
                                apiMessage = setMsgArgs;
                            }),
                            setObj: jest.fn((setObjArgs) => {
                                jsonObj = setObjArgs;
                            })
                        },
                        console: {
                            log: jest.fn((logArgs) => {
                                logMessage += "\n" + logArgs;
                            })
                        },
                        progress: {
                            startBar: jest.fn((parms) => {
                                // do nothing
                            }),
                            endBar: jest.fn(() => {
                                // do nothing
                            })
                        }
                    },
                    profiles: {
                        get: profFunc
                    }
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeUndefined();
            expect(profFunc).toHaveBeenCalledWith("mqrest", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, "fakeNews", undefined);
            expect(jsonObj).toMatchSnapshot();
            expect(apiMessage).toMatchSnapshot();
            expect(logMessage).toMatchSnapshot();
        });

        it("should provide a response with single quotes around the command", async () => {
            // Require the handler and create a new instance
            const handlerReq = require("../../../../src/cli/command/mqsc/MQSCCommand.handler");
            const handler = new handlerReq.default();
            const queuemgr = "testQ";
            const cmd = "'fakeNew'";

            // Vars populated by the mocked function
            let error;
            let apiMessage = "";
            let jsonObj;
            let logMessage = "";
            let fakeSession = null;

            // Mock the qmgrAction function
            MQSCCommand.qmgrAction = jest.fn((session) => {
                fakeSession = session;
                return {
                    success: true,
                    commandResponse:[
                        {
                          completionCode: 0,
                          reasonCode: 0,
                          text: [
                            "CSQN205I   COUNT=       3, RETURN=00000000, REASON=00000000",
                            "CSQM297I ]MQ21 CSQMDRTS NO CHANNEL FOUND MATCHING REQUEST CRITERIA ",
                            "CSQ9022I ]MQ21 CSQMDRTS ' DISPLAY CHANNEL' NORMAL COMPLETION "
                          ],
                        }
                    ],
                    overallCompletionCode: "200",
                    overallReasonCode: "Great"
                };
            });


            // Mocked function references
            const profFunc = jest.fn((args) => {
                return {
                    host: "fake",
                    port: "fake",
                    user: "fake",
                    password: "fake",
                    auth: "fake",
                    rejectUnauthorized: "fake",
                };
            });

            try {
                // Invoke the handler with a full set of mocked arguments and response functions
                await handler.process({
                    arguments: {
                        $0: "fake",
                        _: ["fake"],
                        queuemgr, cmd,
                        ...{
                            host: "somewhere.com",
                            port: "43443",
                            user: "someone",
                            password: "somesecret"
                        }
                    },
                    response: {
                        data: {
                            setMessage: jest.fn((setMsgArgs) => {
                                apiMessage = setMsgArgs;
                            }),
                            setObj: jest.fn((setObjArgs) => {
                                jsonObj = setObjArgs;
                            })
                        },
                        console: {
                            log: jest.fn((logArgs) => {
                                logMessage += "\n" + logArgs;
                            })
                        },
                        progress: {
                            startBar: jest.fn((parms) => {
                                // do nothing
                            }),
                            endBar: jest.fn(() => {
                                // do nothing
                            })
                        }
                    },
                    profiles: {
                        get: profFunc
                    }
                } as any);
            } catch (e) {
                error = e;
            }

            expect(error).toBeUndefined();
            expect(profFunc).toHaveBeenCalledWith("mqrest", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, "fakeNew", undefined);
            expect(jsonObj).toMatchSnapshot();
            expect(apiMessage).toMatchSnapshot();
            expect(logMessage).toMatchSnapshot();
        });
});
