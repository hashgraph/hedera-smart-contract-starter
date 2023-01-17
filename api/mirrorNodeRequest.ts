const https = require("https");

export const httpRequest = async (
    contractEvmAddress: string,
    postData: any
): Promise<any> => {
    const options = {
        hostname: "testnet.mirrornode.hedera.com",
        port: 443,
        path: "/api/v1/contracts/" + contractEvmAddress,
        method: "GET",
    };

    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res: any) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error("statusCode=" + res.statusCode));
            }
            // cumulate data
            var body: Array<any> = [];
            res.on("data", function (chunk: any) {
                body.push(chunk);
            });
            // resolve on end
            res.on("end", function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on("error", function (err: any) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
};