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

import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export default class ClientManagement {
  private accountId = AccountId.fromString(process.env.ADMIN_ID || '');
  private accountKey = PrivateKey.fromString(process.env.ADMIN_KEY || '');

  private tokenUserId = AccountId.fromString(process.env.OPERATOR_ID || '');
  private tokenUserKey = PrivateKey.fromString(process.env.OPERATOR_KEY || '');

  public createOperatorClient = (): Client => {
    return this.doCreateClient(this.tokenUserId, this.tokenUserKey);
  };

  private doCreateClient = (
    accountId: AccountId,
    privateKey: PrivateKey
  ): Client => {
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    return client;
  };

  public getAdmin = () => {
    return {
      adminId: this.accountId,
      adminKey: this.accountKey,
    };
  };

  public getOperator = () => {
    return {
      id: this.tokenUserId,
      key: this.tokenUserKey,
    };
  };

  public createClientAsAdmin = (): Client => {
    return this.doCreateClient(this.accountId, this.accountKey);
  };

}
