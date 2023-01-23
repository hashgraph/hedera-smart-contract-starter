/*-
 *
 * Hedera smart contract starter
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Contract } from "../model/contract"
import { ClientRequest } from "http";
import http = require("https");

export class HttpRequest {

    public static async send(contractEvmAddress: string, data?: never): Promise<Contract> {
        let options: http.RequestOptions;
        let result: string;
        const promise = new Promise<Contract>((resolve, reject) => {
            options = {
                hostname: "testnet.mirrornode.hedera.com",
                port: 443,
                path: `/api/v1/contracts/${contractEvmAddress}`,
                method: "GET",
            };

            const req: ClientRequest = http.request(options, (res) => {

                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);

                res.on("data", chunk => {
                    result += chunk;
                });

                res.on("error", err => {
                    console.log(err);
                    reject(err);
                });

                res.on("end", () => {
                    try {
                        if (res.statusCode === 200) {
                            console.log(res.statusCode, result);
                            resolve(JSON.parse(result) as Contract);
                        }
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                });
            });

            req.on("error", (err: Error) => {
                console.log(err);
                reject(err);
            });

            req.on('timeout', (err: Error) => {
                console.log(err);
                req.abort();
            });

            req.on('uncaughtException', (err: Error) => {
                console.log(err);
                req.abort();
            });

            if (data) {
                const body = JSON.stringify(data);
                req.write(body);
            }

            req.end(() => {
                console.log('request ends');
            });

        });

        return promise;
    }
}