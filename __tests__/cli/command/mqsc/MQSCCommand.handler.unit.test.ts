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
                            "CSQN205I   COUNT=1, RETURN=00000000, REASON=00000000",
                            "CSQM416I  MQ22 CHANNEL(SYSTEM.DEF.CLNTCONN)"
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
            expect(profFunc).toHaveBeenCalledWith("mq", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, cmd);
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
                        text:[
                            "CSQN205I COUNT= 5, RETURN=00000000, REASON=00000000",
                            // tslint:disable-next-line:max-line-length
                            "CSQM416I ]MQ21 CHANNEL(SYSTEM.DEF.CLNTCONN ) CHLTYPE(CLNTCONN ) QSGDISP(QMGR ) QMNAME( ) USERID( ) PASSWORD( ) TRPTYPE(LU62 ) CONNAME( ) DESCR( ) MODENAME( ) TPNAME( ) SCYEXIT( ) SCYDATA( ) SENDEXIT() SENDDATA() RCVEXIT() RCVDATA() CLNTWGHT( 0) AFFINITY(PREFERRED ) SHARECNV( 10) KAINT(AUTO ) ALTDATE(2018-12-05 ) ALTTIME(11.39.18) SSLCIPH( ) SSLPEER( ) DEFRECON(NO ) LOCLADDR( ) MAXMSGL( 4194304) COMPHDR(NONE ) COMPMSG(NONE ) HBINT( 300)",
                            // tslint:disable-next-line:max-line-length
                            "CSQM417I ]MQ21 CHANNEL(SYSTEM.DEF.CLUSRCVR ) CHLTYPE(CLUSRCVR ) QSGDISP(QMGR ) CLUSTER( ) CLUSNL( ) TRPTYPE(LU62 ) CONNAME( ) DESCR( ) MODENAME( ) TPNAME( ) DISCINT( 6000) SHORTRTY( 10) SHORTTMR( 60) LONGRTY( 999999999) LONGTMR( 1200) SCYEXIT( ) SCYDATA( ) MSGEXIT() MSGDATA() SENDEXIT() SENDDATA() RCVEXIT() RCVDATA() MREXIT( ) MRDATA( ) MRRTY( 10) MRTMR( 1000) PROPCTL(COMPAT ) PUTAUT(DEF ) SEQWRAP( 999999999) CONVERT(NO ) BATCHINT( 0) BATCHHB( 0) KAINT(AUTO ) NETPRTY( 0) CLWLRANK( 0) CLWLPRTY( 0) CLWLWGHT( 50) MCATYPE(THREAD ) MONCHL(QMGR ) ALTDATE(2018-12-05 ) ALTTIME(11.39.18) SSLCAUTH(REQUIRED ) SSLCIPH( ) SSLPEER( ) CERTLABL( ) BATCHLIM( 5000) USEDLQ(YES ) STATCHL(QMGR ) MCAUSER( ) LOCLADDR( ) BATCHSZ( 50) MAXMSGL( 4194304) COMPHDR(NONE ) COMPMSG(NONE ) HBINT( 300) NPMSPEED(FAST )",
                            // tslint:disable-next-line:max-line-length
                            "CSQM418I ]MQ21 CHANNEL(SYSTEM.DEF.CLUSSDR ) CHLTYPE(CLUSSDR ) QSGDISP(QMGR ) CLUSTER( ) CLUSNL( ) TRPTYPE(LU62 ) CONNAME( ) DESCR( ) MCANAME( ) MODENAME( ) TPNAME( ) DISCINT( 6000) SHORTRTY( 10) SHORTTMR( 60) LONGRTY( 999999999) LONGTMR( 1200) SCYEXIT( ) SCYDATA( ) MSGEXIT() MSGDATA() SENDEXIT() SENDDATA() RCVEXIT() RCVDATA() PROPCTL(COMPAT ) SEQWRAP( 999999999) CONVERT(NO ) BATCHINT( 0) BATCHHB( 0) KAINT(AUTO ) CLWLRANK( 0) CLWLPRTY( 0) CLWLWGHT( 50) MONCHL(QMGR ) ALTDATE(2018-12-05 ) ALTTIME(11.39.18) SSLCIPH( ) SSLPEER( ) CERTLABL( ) BATCHLIM( 5000) USEDLQ(YES ) STATCHL(QMGR ) MCAUSER( ) LOCLADDR( ) BATCHSZ( 50) MAXMSGL( 4194304) COMPHDR(NONE ) COMPMSG(NONE ) HBINT( 300) NPMSPEED(FAST )",
                            "CSQ9022I ]MQ21 CSQMDRTS ' DISPLAY CHANNEL' NORMAL COMPLETION "
                        ]
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
            expect(profFunc).toHaveBeenCalledWith("mq", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, "fakeNews");
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
                            "CSQN205I   COUNT=1, RETURN=00000000, REASON=00000000",
                            "CSQM416I  MQ24 CHANNEL(SYSTEM.DEF.CLNTCONN)"
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
            expect(profFunc).toHaveBeenCalledWith("mq", false);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledTimes(1);
            expect(MQSCCommand.qmgrAction).toHaveBeenCalledWith(fakeSession, queuemgr, "fakeNew");
            expect(jsonObj).toMatchSnapshot();
            expect(apiMessage).toMatchSnapshot();
            expect(logMessage).toMatchSnapshot();
        });
});
