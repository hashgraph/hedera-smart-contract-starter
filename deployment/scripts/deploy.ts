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

import { main as deployContract } from "./logic";
import { main as createContractProxy } from "./transparentUpgradeableProxy";

async function main() {
  const contractName = process.env.CONTRACT_NAME || '';
  const contractFilepath = process.env.CONTRACT_PATH || '';
  await deployContract(contractName, contractFilepath);
  await createContractProxy(contractName);
  return "Done";
}

main()
  .then((res) => console.log(res))
  .catch((error) => console.error(error))
  .finally(() => process.exit(1));