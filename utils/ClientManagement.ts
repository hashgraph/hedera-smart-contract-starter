import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export default class ClientManagement {
  private accountId = AccountId.fromString(process.env.ADMIN_ID!);
  private accountKey = PrivateKey.fromString(process.env.ADMIN_KEY!);

  private tokenUserId = AccountId.fromString(process.env.OPERATOR_ID!);
  private tokenUserKey = PrivateKey.fromString(process.env.OPERATOR_KEY!);

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
