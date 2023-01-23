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